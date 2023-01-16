---
description: JSON Queries
readTime:
pageClass:
---

## Examples

### Data Model

Test snapshot: [snapshot.zip](https://github.com/directus/directus/files/9764836/snapshot.zip) This contains a basic
collection called "jason" with a single json field "data" for reference in the examples. Consider a single item in this
collection containing the following JSON object:

```json
{
	"propA": [{ "nestedProp": "test1" }, { "nestedProp": "test2" }, { "random": "data" }],
	"propB": {
		"nestedProp": "test3",
		"moreProps": "test4"
	},
	"propC": {
		"nestedProp": "test5",
		"moreProps": "test6"
	}
}
```

### Basics

A json query is used as a function using the following format: `json({{FIELD}}{{QUERY}})` (for example:
`json(fieldName$.jsonProperty)`) The query is a subset of [JSON Path](#JSON-Path), we support the following parts:

**Property accessor (dot notation)**

```
GET /items/jason?fields=json(data$.propA)
{"data":[{"rrvfc":[{"nestedProp":"test1"},{"nestedProp":"test2"},{"random":"data"}]}]}
```

**Array accessor (array indexes only numeric)**

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

### Alias

You may have noticed that the above examples all have a different generated key for the results. This makes using the
function directly in the `fields` list useful for debugging a specific query but very unpractical for anything else. To
solve this you can alias any json query using the `alias` object.

```
GET /items/jason?fields=my_value&alias[my_value]=json(data$.propA[0].nestedProp)
{"data":[{"my_value":"test1"}]}
```

### Filtering [Partly supported]

You can use both the function notation and aliasses for filtering. Using the function notation will not return the
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

> TODO: wildcard `*` fields do not pick up on json queries yet

## Deep queries

This feature enables filtering inside of JSON fields to request just the piece of information you need.

> Warning! The support for this feature is very dependent on the engine used.

```
GET /items/jason?fields=my_value&alias[my_value]=json(data$.propA)&deep={"my_value":{"_filter":{"$.nestedProp":{"_contains":"test"}}}}
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
them support the full spec which goes way beyond what is currently supported in this PR. For now I've opted to only
support:

- `.property` dot notation property access
- `[index]` array index access (only numerical)
- `*` array and property wildcards

## Compatibility

✅ = Native support ❎ =Not yet implemented ☑ = Fallback support ❌= Not supported

| Vendors     | Tested On   | "fields" | "filter" | "deep" | Notes                                        |
| ----------- | ----------- | -------- | -------- | ------ | -------------------------------------------- |
| SQLite3     | 3.38.0      | ✅       | ✅       | ✅     | Fully supported!                             |
| PostgreSQL  | 12.x - 15.x | ✅       | ✅       | ✅     | Fully supported!                             |
| PostgreSQL  | <= 11.x     | ☑        | ❌       | ☑      |                                              |
| MySQL       | 8.x         | ✅       | ✅       | ✅     |                                              |
| MySQL       | 5.7         | ✅       | ✅       | ☑      |                                              |
| MariaDB     | 10.2+       | ✅       | ✅       | ☑      | Has some filter exceptions                   |
| MS SQL      | 2016+       | ☑        | ✅       | ☑      |                                              |
| OracleDB    | 18 XE       | ✅       | ✅       | ✅     |                                              |
| CockroachDB | 22.1.8      | ✅       | ❌       | ☑      | Partly supported                             |
| Redshift    | -           | ☑        | ❌       | ☑      | Fully reliant on post-processing json values |

> Warning: There is no way to properly support Redshift beyond a post-processing fallback as it is effectively Postgres
> 8.x

## Vendor specific exceptions

- [oracle] A query like `$[0]` will return the entire object if the field is an object instead of array.
- [mariadb] Does not seem to support negatives in filters
- [mariadb] Only able to filter against the first value if the jsonPath returns multiple results
- [mariadb/oracledb] Requires `[*]` to be at the end of the jsonfield used to `deep` query
  (`alias[test]=json(data$[*].a[*])&deep={"test":{"_filter":{"$.b":{"_gte":10}}}}`)
- [postgres] we're using the `jsonb` functions for postgres however already existing json fields would have been created
  as `json` type instead
