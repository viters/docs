---
description: JSON Queries
readTime:
---

# JSON Function Guide

The `json()` function allows for extracting or filtering specific data directly from JSON fields. Where possible the
json function will make use of native functions provided by the database vendor if these are not available in a
post-processing fallback is used instead.

There are three main features:

1. [**JSON Extraction.**](/reference/json-query.md#basics) \
   Fetch a specific piece of information from a JSON field. JSON Path is used to specify which data is returned.
2. [**JSON Filtering.**](/reference/json-query.md#deep-queries) \
   Filter the contents of a JSON list. Using a combination of JSON Path and the existing filtering system allows you to filter
   a list by its contents.
3. [**Filtering by JSON.**](/reference/json-query.md#filtering) \
   Filter regular collection items based on a value inside of a JSON field. Be sure to check the [compatibility chart](/reference/json-query.md#compatibility)
   before relying on this feature.

::: warning

This feature is only available on the REST endpoints at this time.

:::

## Basics

The `json(<field><jsonpath>)` function requires two parameters:

1. [A field](/reference/query.md#fields) Same as what you'd use in `fields` to get your JSON field, relational fields
   are supported but wildcards are not!
2. [A JSONPath](/reference/json-query.md#json-path) A Domain Specific Language for querying nested JSON data similar to
   XPath, CSS Selectors, or REGEX.

### Aliasing

By default, the results of this function will use a randomly generated field name to prevent name collision. Because
working with generated names is not very practical you can name the output of this function by defining it in an
`alias`. Don't forget to add your alias to the `fields` list or it will not show up in the output (a `*` wildcard in
fields **does not** include this alias!).

```
?fields[]=json_alias
&alias[json_alias]=json(json_field$.propertyA)
```

::: tip

While it is possible to use the `json()` function directly in `fields` and `filters` it is highly recommended to always
alias your JSON Queries for better maintainability and ability to debug.

:::

## JSON Path

While some database vendors support
[JSONPath spec](https://www.ietf.org/archive/id/draft-goessner-dispatch-jsonpath-00.html) in various degrees not all of
they support the full specification which goes far beyond what can be reliably implemented across all supported vendors.

We support the following features of JSONPath:

- `.property` dot notation property access
- `[index]` array index access (only numerical)
- `.*`/`[*]` array and property wildcards

::: warning

The JSON object property names are limited in this implementation to lower and upper case alphanumeric characters, dash,
and underscore. (`[\w\d-_]+` in REGEX). Special characters like colons `:` and dots `.` are accepted but will be parsed
as a [relational field](/reference/query.md#many-to-any-union-types).

:::

### Examples

For these examples, we call our JSON field `"json_field"` (very original) and fill that field with the following object:

```json
{
	"propertyA": "test123",
	"propertyB": {
		"nestedProperty": "test456",
		"anotherProperty": "test789"
	},
	"propertyList": [
		{ "key": "key1", "value": "val1" },
		{ "key": "key2", "value": "val2" }
	]
}
```

**Accessing a property**\
Query: `json(json_field$.propertyA)`\
Result: `test123`

Query: `json(json_field$.propertyB)`\
Result: `{ "nestedProperty": "test456" }`

Query: `json(json_field$.propertyB.nestedProperty)`\
Result: `test456`

**Getting an array item**\
Query: `json(json_field$.propertyList[0])`\
Result: `{ "key": "key1", "value": "val1" }`

Query: `json(json_field$.propertyList[1].key)`\
Result: `key2`

**Using wildcards**\
Query: `json(json_field$.propertyB.*)`\
Result: `[ "test456", "test789" ]`

Query: `json(json_field$.propertyList[*].value)`\
Result: `[ "val1", "val2" ]`

Query: `json(json_field$.propertyList[*].*)`\
Result: `[ "key1", "val1", "key2", "val2" ]`

## JSON Extraction

Using the `json()` function allows you to retrieve a specific piece of information from within a JSON field.

```
GET /items/jason?fields=my_value&alias[my_value]=json(data$.propA[0].nestedProp)

{"data":[{"my_value":"test1"}]}
```

## JSON Filtering

This feature enables filtering inside JSON fields to request just the piece of information you need. Making use of the
`deep` query structure allowing you to treat a JSON field as a relation containing data.

```
GET /items/jason?fields=my_value&alias[my_value]=json(data$.propA)&deep={"my_value":{"_filter":{"$.nestedProp":{"_contains":"test"}}}}
```

## Filtering by JSON

You can use both the function notation and aliases for filtering. Using the function notation will not return the
extracted data for the filter while with an alias you can include this in the fields list to retrieve that specific
value.

```
GET /items/jason?fields=my_value&alias[my_value]=json(data$.propA[0].nestedProp)&filter={"my_value"{"_eq":"test1"}}

{"data":[{"my_value":"test1"}]}
```

```
/items/jason?fields=data&filter={"json(data$.propA[0].nestedProp)"{"_eq":"test1"}}

{"data":[{"data":{"propA":[{"nestedProp":"test1"},{"nestedProp":"test2"},{"random":"data"}],"propB":{"nestedProp":"test3","moreProps":"test4"}}"}]}
```

::: info

This will filter the items in the collection you're querying not the data inside a specific json object.

:::

## Database Compatibility

✅ = Native support ☑ = Fallback support ❌= Not supported

| Vendors     | Tested On   | "fields" | "filter" | "deep" | Notes                 |
| ----------- | ----------- | -------- | -------- | ------ | --------------------- |
| SQLite      | 3.38.0      | ✅       | ✅       | ✅     | Full native support   |
| PostgreSQL  | 12.x - 15.x | ✅       | ✅       | ✅     | Full native support   |
| PostgreSQL  | <= 11.x     | ☑        | ❌       | ☑      | No native support     |
| MySQL       | 8.x         | ✅       | ✅       | ✅     | Full native support   |
| MySQL       | 5.7         | ✅       | ✅       | ☑      |
| MariaDB     | 10.2+       | ✅       | ✅       | ☑      | Has filter exceptions |
| MS SQL      | 2016+       | ☑        | ✅       | ☑      |
| OracleDB    | 18 XE       | ✅       | ✅       | ✅     | Full native support   |
| CockroachDB | 22.1.8      | ✅       | ❌       | ☑      | Partly supported      |
| Redshift    | -           | ☑        | ❌       | ☑      | No native support     |

## Database Vendor Exceptions

- [OracleDB] A query like `$[0]` will return the entire object if the field is an object instead of an array.
- [MariaDB] Does not seem to support negatives in filters
- [MariaDB] Only able to filter against the first value if the JSONPath returns multiple results
- [MariaDB/OracleDB] Requires `[*]` to be at the end of the JSONPath used in `deep` queries to make sure it is filtering
  on an array.
  ```
  ?alias[test]=json(data$[*].a[*])
  &deep={"test":{"_filter":{"$.b":{"_gte":10}}}}
  ```
- [Redshift] Has no native support for JSON
