---
description: An introduction to the REST and GraphQL APIs in Directus.
readTime: 7 min read
pageClass: page-reference
---

# API Reference

> Directus offers both a REST and GraphQL API to manage the data in the database. The API has predictable
> resource-oriented URLs, relies on standard HTTP status codes, and uses JSON for input and output.

## Dynamic API

The platform's API uses [Database Mirroring](/getting-started/introduction#database-mirroring) to dynamically generate
REST endpoints and a GraphQL schema based on the connected database's architecture. Since these endpoints return data
based on your specific schema and configured permissions, the input/output of the API differs greatly for individual
installations.

## REST vs. GraphQL

**There is no difference in the functionality available between the REST and GraphQL endpoints.** The functionality
available in both is mapped to the same set of core services, meaning that you don't lose any performance or
capabilities by choosing one or the other.

Which one you choose is ultimately up to you.

## Authentication

By default, all data in the system is off-limits for unauthenticated users. To gain access to protected data, you must
[include an access token with every request](/reference/authentication#access-tokens), or
[configure permissions for the public role](/getting-started/quickstart#_6-set-role-public-permissions).

Useful references:

- [Authenticating into the API](/reference/authentication)
- [Login endpoint reference](/reference/authentication#login)

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

## System data in GraphQL

Due to restrictions in GraphQL itself, it's impossible to properly scope/namespace system functionality from regular
data access. In order to prevent any naming conflicts between user-created and system data, we've scoped the access of
the two into separate endpoints for user and system data respectively: `/graphql` and `/graphql/system`. Both endpoints
share the same underlying schema, so **nested relations will work as expected** regardless if they "cross over" between
user and system data. The only difference in the two endpoints are the root query and mutation fields available.

## Error Codes

Below are the global error codes used within Directus, and what they mean.

| Error Code               | HTTP Status | Description                                                     |
| ------------------------ | ----------- | --------------------------------------------------------------- |
| `FAILED_VALIDATION`      | 400         | Validation for this particular item failed                      |
| `FORBIDDEN`              | 403         | You are not allowed to do the current action                    |
| `INVALID_TOKEN`          | 403         | Provided token is invalid                                       |
| `TOKEN_EXPIRED`          | 401         | Provided token is valid but has expired                         |
| `INVALID_CREDENTIALS`    | 401         | Username / password or access token is wrong                    |
| `INVALID_IP`             | 401         | Your IP address isn't allow-listed to be used with this user    |
| `INVALID_OTP`            | 401         | Wrong OTP was provided                                          |
| `INVALID_PAYLOAD`        | 400         | Provided payload is invalid                                     |
| `INVALID_QUERY`          | 400         | The requested query parameters can not be used                  |
| `UNSUPPORTED_MEDIA_TYPE` | 415         | Provided payload format or `Content-Type` header is unsupported |
| `REQUESTS_EXCEEDED`      | 429         | Hit the rate limit                                              |
| `ROUTE_NOT_FOUND`        | 404         | Endpoint does not exist                                         |
| `SERVICE_UNAVAILABLE`    | 503         | Could not use external service                                  |
| `UNPROCESSABLE_ENTITY`   | 422         | You tried doing something illegal                               |

::: warning Security

To prevent leaking which items exist, all actions for non-existing items will return a `FORBIDDEN` error.

:::
