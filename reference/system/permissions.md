---
description: REST and GraphQL API documentation on the Permissions collection in Directus.
readTime: 5 min read
pageClass: page-reference
---

<script setup>
import { useLocalStorage } from '@vueuse/core';
const pref = useLocalStorage('pref', 'REST');
</script>

# Permissions

> Permissions are assigned to Roles, and control data access throughout the platform.
> [Learn more about Permissions](/getting-started/glossary#permissions).

---

## The Permission Object

`id` **uuid**\
Primary key of the permission rule.

`role` **many-to-one**\
Role this permission applies to. Many-to-one to [roles](/reference/system/roles). `null` is used for public permissions.

`collection` **string**\
Collection this permission rule applies to.

`action` **string**\
What CRUD operation this permission rule applies to. One of `create`, `read`, `update`, `delete`.

`permissions` **object**\
What rules the item must pass before the role is allowed to alter it. Follows [the Filter Rules spec](/reference/filter-rules).

`validation` **object**\
What rules the provided values must pass before the role is allowed to submit them for insertion/update. Follows [the Filter Rules spec](/reference/filter-rules).

`preset` **object**\
Additional default values for the role.

`fields` **array**\
What fields the user is allowed to alter.

```json
{
	"id": 34,
	"role": "c86c2761-65d3-43c3-897f-6f74ad6a5bd7",
	"collection": "pages",
	"action": "create",
	"permissions": null,
	"validation": {
		"title": {
			"_contains": "Directus"
		}
	},
	"presets": {
		"published": false
	},
	"fields": ["title", "translations"]
}
```

---

## List Permissions

List all permissions that exist in Directus.

If using REST, learn more about using [SEARCH](/reference/introduction#search-http-method)

::: tip Permissions

The data returned in this endpoint will be filtered based on the user's permissions. For example, permissions for a role
other than the current user's role won't be returned.

:::

### Query Parameters

Supports all [global query parameters](/reference/query).

### Returns

An array of up to [limit](/reference/query#limit) [permission objects](#the-permission-object). If no items are
available, data will be an empty array.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
GET /permissions
SEARCH /permissions
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	permissions: directus_permissions
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

### Example

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
GET /permissions
SEARCH /permissions
```

</template>
<template #graphql>

```graphql
query {
	permissions {
		action
		role
		collection
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

---

## Retrieve a Permission

List an existing permission by primary key.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Returns

Returns the requested [permission object](#the-permission-object).

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
GET /permissions/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	permissions_by_id(id: ID!): directus_permissions
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

### Example

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
GET /permissions/34
```

</template>
<template #graphql>

```graphql
query {
	permissions_by_id(id: 34) {
		role
		collection
		action
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

---

## Create a Permission Rule

Create a new permission rule

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

A partial [permissions object](#the-permission-object). `action` and `collection` are required.

### Returns

Returns the [permission object](#the-permission-object) for the created permission.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
POST /permissions
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	create_permissions_item(data: create_directus_permissions_input!): directus_permissions
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

### Example

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```json
// POST /permissions

{
	"collection": "pages",
	"action": "read",
	"role": "c86c2761-65d3-43c3-897f-6f74ad6a5bd7",
	"fields": ["id", "title"]
}
```

</template>
<template #graphql>

```graphql
mutation {
	create_permissions_item(
		data: { collection: "pages", action: "read", role: "c86c2761-65d3-43c3-897f-6f74ad6a5bd7", fields: ["id", "title"] }
	) {
		id
		collection
		action
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

---

## Create Multiple Permission Rules

Create multiple new permission rules

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

An array of partial [permissions objects](#the-permission-object). `action` and `collection` are required.

### Returns

Returns the [permission objects](#the-permission-object) for the created permissions.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
POST /permissions
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	create_permissions_items(data: [create_directus_permissions_input!]!): [directus_permissions]
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

### Example

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```json
// POST /permissions

[
	{
		"collection": "pages",
		"action": "read",
		"role": "c86c2761-65d3-43c3-897f-6f74ad6a5bd7",
		"fields": ["id", "title"]
	},
	{
		"collection": "pages",
		"action": "create",
		"role": "c86c2761-65d3-43c3-897f-6f74ad6a5bd7",
		"fields": ["id", "title"]
	}
]
```

</template>
<template #graphql>

```graphql
mutation {
	create_permissions_items(
		data: [
			{ collection: "pages", action: "read", role: "c86c2761-65d3-43c3-897f-6f74ad6a5bd7", fields: ["id", "title"] }
			{ collection: "pages", action: "create", role: "c86c2761-65d3-43c3-897f-6f74ad6a5bd7", fields: ["id", "title"] }
		]
	) {
		id
		collection
		action
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

---

## Update Permissions

Update an existing permissions rule.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

A partial [permissions object](#the-permission-object).

### Returns

Returns the [permission object](#the-permission-object) for the updated permission.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
PATCH /permissions/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	update_permissions_item(id: ID!, data: update_directus_permissions_input!): directus_permissions
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

### Example

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```json
// PATCH /permissions/34

{
	"fields": ["id", "title", "body"]
}
```

</template>
<template #graphql>

```graphql
mutation {
	update_permissions_item(id: 34, data: { fields: ["id", "title", "body"] }) {
		id
		action
		collection
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

---

## Update Multiple Permissions

Update multiple existing permissions rules.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

### Request

`keys` **Required**\
Array of primary keys of the permissions you'd like to update.

`data` **Required**\
Any of [the permission object](#the-permission-object)'s properties.

### Returns

Returns the [permission object](#the-permission-object) for the updated permissions.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
PATCH /permissions
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	update_permissions_items(id: [ID!]!, data: update_directus_permissions_input!): [directus_permissions]
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

### Example

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```json
// PATCH /permissions

{
	"keys": [34, 65],
	"data": {
		"fields": ["id", "title", "body"]
	}
}
```

</template>
<template #graphql>

```graphql
mutation {
	update_permissions_items(ids: [34, 64], data: { fields: ["id", "title", "body"] }) {
		id
		action
		collection
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

---

## Delete Permissions

Delete an existing permissions rule

### Returns

Empty body.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
DELETE /permissions/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	delete_permissions_item(id: ID!): delete_one
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

### Example

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
DELETE /permissions/34
```

</template>
<template #graphql>

```graphql
mutation {
	delete_permissions_item(id: 34) {
		id
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

---

## Delete Multiple Permissions

Delete multiple existing permissions rules

### Request

An array of permission primary keys

### Returns

Empty body.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
DELETE /permissions
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	delete_permissions_items(ids: [ID!]!): delete_many
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

### Example

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```json
// DELETE /permissions

[34, 64]
```

</template>
<template #graphql>

```graphql
mutation {
	delete_permissions_items(ids: [34, 64]) {
		ids
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

---
