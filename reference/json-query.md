---
description: JSON Queries
readTime:
---

# JSON Function Guide

The `json()` function allows for extracting or filtering specific data directly from JSON fields. Where possible json
functions will make use of native function provided by the database vendor if these are not available a post-processing
fallback is used instead.

There are three main features:

1. **JSON Extraction.** [Example](/reference/json-query.md#basics) \
   This is used to fetch a specific piece of information from a JSON object. This fully relies on the JSON Path specification
   for which data is returned.
2. **JSON Filtering.** [Example](/reference/json-query.md#deep-queries) \
   This is used to conditionally fetch a piece of information from a JSON List. This allows you to use the Directus built-in
   filters to only return the item matching your conditions.
3. **Filtering by JSON.** [Example](/reference/json-query.md#filtering) \
   This is used to filter regular collection items based on a value inside of a JSON field. Be sure to check the [compatibility chart](/reference/json-query.md#compatibility)
   before relying on this feature.

::: warning

This feature is currently only supported on the REST endpoints.

:::

## Basics

The `json(<field><jsonpath>)` function requires two parameters:

1. [A field](#fields) Same as what you'd use in `fields` to get your JSON field, relational fields are supported but
   wildcards are not!
2. [A JSONPath](/reference/json-query.md#json-path) A Domain Specific Language for querying nested JSON data similar to
   XPath, CSS Selectors or REGEX.

### Alias

By default the results of this function will use a randomly generated field name to prevent name collision. Because
working with generated names is not very practical you can name the output of this function by defining it in an
`alias`. Don't forget to add your alias to the `fields` list or it will not show up in the output (a `*` wildcard in
fields should work too).

```
?fields[]=json_alias
&alias[json_alias]=json(json_field$.propA)
```

::: tip

While it is possible to use the `json()` function directly in `fields` and `filters` it is highly recommended to always
alias your JSON Queries for better maintainability and ability to debug.

:::

## JSON Extraction

Using the `json()` function this allows you to retrieve a specific piece of information from within a JSON field.

```
GET /items/jason?fields=my_value&alias[my_value]=json(data$.propA[0].nestedProp)

{"data":[{"my_value":"test1"}]}
```

## JSON Filtering

This feature enables filtering inside of JSON fields to request just the piece of information you need. Making use of
the `deep` query structure allowing you to treat a JSON field as a relation containing data.

```
GET /items/jason?fields=my_value&alias[my_value]=json(data$.propA)&deep={"my_value":{"_filter":{"$.nestedProp":{"_contains":"test"}}}}
```

## Filtering by JSON

You can use both the function notation and aliases for filtering. Using the function notation will not return the
extracted data for the filter while with an alias you can include this in the fields list to retrieve that specific
value.

> Note: this will filter the items in the collection you're requesting not the data inside the json object.

```
GET /items/jason?fields=my_value&alias[my_value]=json(data$.propA[0].nestedProp)&filter={"my_value"{"_eq":"test1"}}

{"data":[{"my_value":"test1"}]}
```

```
/items/jason?fields=data&filter={"json(data$.propA[0].nestedProp)"{"_eq":"test1"}}

{"data":[{"data":{"propA":[{"nestedProp":"test1"},{"nestedProp":"test2"},{"random":"data"}],"propB":{"nestedProp":"test3","moreProps":"test4"}}"}]}
```

## Relational fields

It (will be) possible to use relational fields within the json function. For example:

```
Collections:
collection_a (id primaryKey, related m2o -> collection_b)
collection_b (id primaryKey, data json)

Request:
GET /items/collection_a?fields=nested&alias[nested]=json(related.data$.someProperty)
{"data":[{"related":{"nested":"found it"}}]}
```

## JSON Path

While some database vendors support
[JSONPath spec](https://www.ietf.org/archive/id/draft-goessner-dispatch-jsonpath-00.html) in various degrees not all of
them support the full specification which goes far beyond what can be reliably implemented across all supported vendors.

We support the following features of JSONPath:

- `.property` dot notation property access
- `[index]` array index access (only numerical)
- `.*`/`[*]` array and property wildcards

## Examples

**Property (dot notation)**

```
GET /items/jason?fields=json(data$.propA)
{"data":[{"rrvfc":[{"nestedProp":"test1"},{"nestedProp":"test2"},{"random":"data"}]}]}
```

**Array indices (only numeric)**

```
GET /items/jason?fields=json(data$.propA[0])
{"data":[{"ynpwa":{"nestedProp":"test1"}}]}
```

**Property wildcard**

```
GET /items/jason?fields=json(data$.*.nestedProp)
{"data":[{"jaohm":["test3","test5"]}]}
```

**Array wildcard**

```
GET /items/jason?fields=json(data$.propA[*].nestedProp)
{"data":[{"gnsae":["test1","test2"]}]}
```

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

- [OracleDB] A query like `$[0]` will return the entire object if the field is an object instead of array.
- [MariaDB] Does not seem to support negatives in filters
- [MariaDB] Only able to filter against the first value if the JSONPath returns multiple results
- [MariaDB/OracleDB] Requires `[*]` to be at the end of the JSONPath used in `deep` queries to make sure it is filtering
  on an array.
  ```
  ?alias[test]=json(data$[*].a[*])
  &deep={"test":{"_filter":{"$.b":{"_gte":10}}}}
  ```
- [Redshift] Has no native support for JSON
