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

Each API is mapped to the same set of core services. However, at present, there are some feature parities (missing
endpoints) between each API. These endpoint parities are under review for future development. To get around this, you
can use multiple APIs in your project, [submit a PR request](/contributing/introduction.html) through GitHub, or
[reach out to the team](https://directus.io/contact/) about sponsoring a feature. Please keep this in mind and choose
accordingly, based on your project needs.

## Dynamic API Generation

Directus dynamically generates the endpoints for all collections in your project.

The platform uses [Database Mirroring](/getting-started/introduction#database-mirroring) to dynamically generate REST
endpoints and a GraphQL schema. Therefore, the API is unique for each project, as these endpoints return data based on
your specific database schema, permissions, and configurations.

For more details, please see the [Endpoints Intro](/reference/endpoints.md) documentation.

## Authentication

By default, all data is restricted for unauthenticated users. To gain access to protected data, you must authenticate,
include an access token with every request, or configure permissions for the public role. For more details, please see
the:

- API documentation on [Authentication](/reference/authentication).
- API documentation on [Permissions](/reference/system/permissions).
- Explanation and in-app configuration guide to
  [Users, Roles and Permissions](/configuration/users-roles-permissions.md)
