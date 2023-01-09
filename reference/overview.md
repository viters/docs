---
description: An introduction to the REST and GraphQL APIs in Directus.
readTime: 7 min read
pageClass: page-reference
---

# API Reference

> There are three ways to communicate with Directus: the REST API, the GraphQL API, and the JavaScript SDK. Whichever
> you choose, you'll get predictable resource-oriented URLs (or methods for the SDK), standard HTTP status codes, and
> use JSON for input and output.

## REST vs GraphQL vs SDK

**_There is no feature difference_ between the REST, GraphQL, and JS-SDK.**

The functionality available is mapped to the same set of core services, meaning that you don't lose any performance or
capabilities by choosing one or the other. Which one you choose is ultimately up to you.

## Dynamic API Generation

Directus dynamically generates the endpoints for all collections in your project.

The platform uses [Database Mirroring](/getting-started/introduction#database-mirroring) to dynamically generate REST
endpoints and a GraphQL schema. Therefore, the API is unique for each project, as these endpoints return data based on
your specific database schema, permissions, and configurations.

For more details, please see the documentation on [Endpoints](/reference/endpoints.md).

## Authentication

By default, all data is restricted for unauthenticated users. To gain access to protected data, you must authenticate,
include an access token with every request, or configure permissions for the public role. For more details, please see
the:

- API documentation on [Authentication](/reference/authentication).
- API documentation on [Permissions](/reference/system/permissions).
- Explanation and in-app configuration guide to
  [Users, Roles and Permissions](/configuration/users-roles-permissions.md)
