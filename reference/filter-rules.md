---
description: REST and GraphQL API documentation for filter rules in Directus.
readTime: 5 min read
---

# Filters

> Permissions, validation, and the API's `filter` parameter all rely on a specific JSON structure to define their rules.
> This page describes the syntax for creating flat, relational, or complex filter rules.

## Syntax

- **Field** — Any valid root field, [relational field](#relational), or [logical operator](#logical-operators)
- **Operator** — Any valid [filter operator](#filter-operators)
- **Value** — Any valid static value, or [dynamic variable](#dynamic-variables)

```
{
	<field>: {
		<operator>: <value>
	}
}
```

### Examples

```json
{
	"title": {
		"_contains": "Directus"
	}
}
```

```json
{
	"owner": {
		"_eq": "$CURRENT_USER"
	}
}
```

```json
{
	"datetime": {
		"_lte": "$NOW"
	}
}
```

## Filter Operators

| Operator Title _(in app)_      | Operator                           | Description                            |
| ------------------------------ | ---------------------------------- | -------------------------------------- |
| Equals                         | `_eq`                              | Equal to                               |
| Doesn't equal                  | `_neq`                             | Not equal to                           |
| Less than                      | `_lt`                              | Less than                              |
| Less than or equal to          | `_lte`                             | Less than or equal to                  |
| Greater than                   | `_gt`                              | Greater than                           |
| Greater than or equal to       | `_gte`                             | Greater than or equal to               |
| Is one of                      | `_in`                              | Matches any of the values              |
| Is not one of                  | `_nin`                             | Doesn't match any of the values        |
| Is null                        | `_null`                            | Is `null`                              |
| Isn't null                     | `_nnull`                           | Is not `null`                          |
| Contains                       | `_contains`                        | Contains the substring                 |
| Doesn't contain                | `_ncontains`                       | Doesn't contain the substring          |
| Starts with                    | `_starts_with`                     | Starts with                            |
| Doesn't start with             | `_nstarts_with`                    | Doesn't start with                     |
| Ends with                      | `_ends_with`                       | Ends with                              |
| Doesn't end with               | `_nends_with`                      | Doesn't end with                       |
| Is between                     | `_between`                         | Is between two values (inclusive)      |
| Isn't between                  | `_nbetween`                        | Is not between two values (inclusive)  |
| Is empty                       | `_empty`                           | Is empty (`null` or falsy)             |
| Isn't empty                    | `_nempty`                          | Is not empty (`null` or falsy)         |
| Intersects                     | `_intersects` <sup>[1]</sup>       | Value intersects a given point         |
| Doesn't intersect              | `_nintersects` <sup>[1]</sup>      | Value does not intersect a given point |
| Intersects Bounding box        | `_intersects_bbox` <sup>[1]</sup>  | Value is in a bounding box             |
| Doesn't intersect bounding box | `_nintersects_bbox` <sup>[1]</sup> | Value is not in a bounding box         |

The following operator has no Title on the Filter Interface as it is **only available in validation permissions**:

| Operator                | Description              |
| ----------------------- | ------------------------ |
| `_regex` <sup>[2]</sup> | Field has to match regex |

<sup>[1]</sup> Only available on Geometry types.\
<sup>[2]</sup> JavaScript "flavor" regex. Make sure to escape backslashes.

## Relational

You can target related values by nesting field names. For example, if you have a relational Many-to-One `author` field,
you can set a rule for the `author.name` field using the following syntax.

```json
{
	"author": {
		"name": {
			"_eq": "Rijk van Zanten"
		}
	}
}
```

When using M2M relationships, a junction table will be created and the filter applies to the junction table itself. For
example, if you have a `books` collection, with a M2M relationship to authors of each book, the junction collection will
probably be named `books_authors` and have 3 fields : `id`, `books_id` and `authors_id`. To filter specific books
depending on their authors you must go through the junction table and the `authors_id` field :

```json
{
	"authors": {
		"authors_id": {
			"name": {
				"_eq": "Rijk van Zanten"
			}
		}
	}
}
```

## Logical Operators

You can nest or group multiple rules using the `_and` or `_or` logical operators. Each logical operator holds an array
of Filter Rules, allowing for more complex filtering. Also note in the example that Logical Operators can be sub-nested
into Logical Operators. However, they cannot be sub-nested into Filter Rules.

```json
{
	"_or": [
		{
			"_and": [
				{
					"user_created": {
						"_eq": "$CURRENT_USER"
					}
				},
				{
					"status": {
						"_in": ["published", "draft"]
					}
				}
			]
		},
		{
			"_and": [
				{
					"user_created": {
						"_neq": "$CURRENT_USER"
					}
				},
				{
					"status": {
						"_in": ["published"]
					}
				}
			]
		}
	]
}
```

### Some vs None in One-to-Many

When applying filters to a one-to-many field, Directus will default to a "some" search, for example in:

```json
{
	"categories": {
		"name": {
			"_eq": "Recipe"
		}
	}
}
```

the top level parent will be returned if _one of_ the categories has the name `Recipe`. This behavior can be overridden
by using the explicit `_some` and `_none` operators, for example:

```json
{
	"categories": {
		"_none": {
			"name": {
				"_eq": "Recipe"
			}
		}
	}
}
```

will fetch all parent items that don't have the category "Recipe"

## Dynamic Variables

In addition to static values, you can also filter against _dynamic_ values using the following variables.

- `$CURRENT_USER` — The primary key of the currently authenticated user
- `$CURRENT_ROLE` — The primary key of the role for the currently authenticated user
- `$NOW` — The current timestamp
- `$NOW(<adjustment>)` - The current timestamp plus/minus a given distance, for example `$NOW(-1 year)`,
  `$NOW(+2 hours)`

:::tip Functions

You can also use [Function Parameters](/reference/query#functions) when building Filters.

:::

::: tip Nested User / Role variables in Permissions

When configuring permissions, `$CURRENT_USER` and `$CURRENT_ROLE` allow you to specify any (nested) field under the
current user/role as well as the root ID. For example: `$CURRENT_ROLE.name` or `$CURRENT_USER.avatar.filesize`. This
includes custom fields that were added to the directus_users/directus_roles tables.

Note: This feature is only available for permissions, validation, and presets. Regular filters and conditional fields
currently only support the root ID.

:::

## SEARCH HTTP Method

When using the REST API to read multiple items by (very) advanced filters, you might run into the issue where the URL
simply can't hold enough data to include the full query structure. In those cases, you can use the SEARCH HTTP method as
a drop-in replacement for GET, where you're allowed to put the query into the request body as follows:

**Before:**

```
GET /items/articles?filter[title][_eq]=Hello World
```

**After:**

```json
SEARCH /items/articles

{
	"query": {
		"filter": {
			"title": {
				"_eq": "Hello World"
			}
		}
	}
}
```

There's a lot of discussion around whether or not to put a body in a GET request, to use POSTs to create search queries,
or to rely on a different method altogether. As of right now, we've chosen
[to align with IETF's _HTTP SEARCH Method_ specification](https://datatracker.ietf.org/doc/draft-ietf-httpbis-safe-method-w-body).
While we recognize this is still a draft spec, the SEARCH method has been used extensively before in the WebDAV world
([spec](https://tools.ietf.org/html/rfc5323)), and compared to the other available options, it feels like the "cleanest"
and most correct to handle this moving forward. As with everything else, if you have any ideas, opinions, or concerns,
[we'd love to hear your thoughts](https://github.com/directus/directus/discussions/new).

Useful reading:

- [_HTTP SEARCH Method_ (IETF, 2021)](https://datatracker.ietf.org/doc/draft-ietf-httpbis-safe-method-w-body)
- [_Defining a new HTTP method: HTTP SEARCH_ (Tim Perry, 2021)](https://httptoolkit.tech/blog/http-search-method)
- [_HTTP GET with request body_ (StackOverflow, 2009 and ongoing)](https://stackoverflow.com/questions/978061/http-get-with-request-body)
- [_Elastic Search GET body usage_ (elastic, n.d.)](https://www.elastic.co/guide/en/elasticsearch/guide/current/_empty_search.html)
- [_Dropbox starts using POST, and why this is poor API design._ (Evert Pot, 2015)](https://evertpot.com/dropbox-post-api)
