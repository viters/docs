---
description: REST and GraphQL API documentation on the Webhooks collection in Directus.
readTime: 5 min read
pageClass: page-reference
---

<script setup>
import { ref } from 'vue';

import { SnippetToggler } from '@directus/vue-snippet-toggler';
import '@directus/vue-snippet-toggler/style.css';

const pref = ref('REST');
</script>

# Webhooks

> Webhooks are configured within the App (no code required) and send HTTP requests to an external service when a
> specific event is triggered.

---

:::danger

Webhooks API is no longer under active development and scheduled to be phased-out of the Directus Core platform
entirely. To achieve webhook functionality and beyond, use [flows](/reference/system/flows.md).

:::

## The Webhook Object

`id` **integer**\
Primary key of the webhook.

`name` **string**\
Name for the webhook. Shown in the Admin App.

`method` **string**\
HTTP method to use. One of `GET`, `POST`.

`url` **string**\
Where to send the request too.

`status` **string**\
Status of the webhook. One of `active`, `inactive`.

`data` **boolean**\
Whether or not to send the event data to the external endpoint.

`actions` **csv**\
When to fire the webhook. Can contain `create`, `update`, `delete`.

`collections` **csv**\
What collections to fire this webhook on.

```json
{
	"data": {
		"id": 1,
		"name": "Build Website",
		"method": "POST",
		"url": "https://example.com/",
		"status": "active",
		"data": true,
		"actions": ["create", "update"],
		"collections": ["articles"]
	}
}
```

---

## List Webhooks

List all webhooks that exist in Directus.

If using REST, learn more about using [SEARCH](/reference/introduction#search-http-method)

### Query Parameters

Supports all [global query parameters](/reference/query).

### Returns

An array of up to [limit](/reference/query#limit) [webhook objects](#the-webhook-object). If no items are available,
data will be an empty array.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL']"
	label="API" >

<template #rest>

```
GET /webhooks
SEARCH /webhooks
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	webhooks: [directus_webhooks]
}
```

</template>

</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
GET /webhooks
SEARCH /webhooks
```

</template>
<template #graphql>

```graphql
query {
	webhooks {
		url
		method
	}
}
```

</template>
<template #js-sdk>

</template>
</SnippetToggler>

---

## Retrieve a Webhook

List an existing webhook by primary key.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Returns

Returns the requested [webhook object](#the-webhook-object).

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL']"
	label="API" >

<template #rest>

```
GET /webhooks/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	webhooks_by_id(id: ID!): directus_webhooks
}
```

</template>

</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
GET /webhooks/:id
```

</template>
<template #graphql>

```graphql
query {
	webhooks_by_id(id: 15) {
		url
		actions
		method
	}
}
```

</template>
<template #js-sdk>

</template>
</SnippetToggler>

---

## Create a Webhook

Create a new webhook.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request Body

A partial [webhook object](#the-webhook-object).

`name`, `actions`, `collections`, and `url` are required.

### Returns

Returns the [webhook object](#the-webhook-object) for the created webhook.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL']"
	label="API" >

<template #rest>

```
POST /webhooks
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	create_webhooks_item(data: create_directus_webhooks_input!): directus_webhooks
}
```

</template>

</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```json
// POST /webhooks

{
	"name": "Example",
	"actions": ["create", "update"],
	"collections": ["articles"],
	"url": "https://example.com"
}
```

</template>
<template #graphql>

```graphql
mutation {
	create_webhooks_item(
		data: { name: "Example", actions: ["create", "update"], collections: ["articles"], url: "https://example.com" }
	) {
		id
		name
	}
}
```

</template>
<template #js-sdk>

</template>
</SnippetToggler>

---

## Create Multiple Webhook

Create multiple new webhooks.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request Body

An array of partial [webhook object](#the-webhook-object).

`name`, `actions`, `collections`, and `url` are required.

### Returns

Returns the [webhook objects](#the-webhook-object) for the created webhooks.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL']"
	label="API" >

<template #rest>

```
POST /webhooks
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	create_webhooks_items(data: [create_directus_webhooks_input!]!): [directus_webhooks]
}
```

</template>

</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```json
// POST /webhooks

[
	{
		"name": "Example",
		"actions": ["create", "update"],
		"collections": ["articles"],
		"url": "https://example.com"
	},
	{
		"name": "Second Example",
		"actions": ["delete"],
		"collections": ["articles"],
		"url": "https://example.com/on-delete"
	}
]
```

</template>
<template #graphql>

```graphql
mutation {
	create_webhooks_items(
		data: [
			{ name: "Example", actions: ["create", "update"], collections: ["articles"], url: "https://example.com" }
			{ name: "Second Example", actions: ["delete"], collections: ["articles"], url: "https://example.com/on-delete" }
		]
	) {
		id
		name
	}
}
```

</template>
<template #js-sdk>

</template>
</SnippetToggler>

---

## Update a Webhook

Update an existing webhook.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request Body

A partial [webhook object](#the-webhook-object).

### Returns

Returns the [webhook object](#the-webhook-object) for the updated webhook.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL']"
	label="API" >

<template #rest>

```
PATCH /webhooks/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	update_webhooks_item(id: ID!, data: update_directus_webhooks_input!): directus_webhooks
}
```

</template>

</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```json
// PATCH /webhooks/15

{
	"name": "Build Website"
}
```

</template>
<template #graphql>

```graphql
mutation {
	update_webhooks_item(id: 15, data: { name: "Build Website" }) {
		name
	}
}
```

</template>
<template #js-sdk>

</template>
</SnippetToggler>

---

## Update Multiple Webhooks

Update multiple existing webhooks.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request Body

`keys` **Required**\
Array of primary keys of the webhooks you'd like to update.

`data` **Required**\
Any of [the webhook object](#the-webhook-object)'s properties.

### Returns

Returns the [webhook objects](#the-webhook-object) for the updated webhooks.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL']"
	label="API" >

<template #rest>

```
PATCH /webhooks
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	update_webhooks_items(ids: [ID!]!, data: update_directus_webhooks_input!): [directus_webhooks]
}
```

</template>

</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```json
// PATCH /webhooks

{
	"keys": [15, 41],
	"data": {
		"name": "Build Website"
	}
}
```

</template>
<template #graphql>

```graphql
mutation {
	update_webhooks_items(ids: [15, 41], data: { name: "Build Website" }) {
		name
	}
}
```

</template>
<template #js-sdk>

</template>
</SnippetToggler>

---

## Delete a Webhook

Delete an existing webhook.

### Returns

Empty body.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL']"
	label="API" >

<template #rest>

```
DELETE /webhooks/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	delete_webhooks_item(id: ID!): delete_one
}
```

</template>

</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
DELETE /webhooks/15
```

</template>
<template #graphql>

```graphql
mutation {
	delete_webhooks_item(id: 15) {
		id
	}
}
```

</template>
<template #js-sdk>

</template>
</SnippetToggler>

---

## Delete Multiple Webhooks

Delete multiple existing webhooks.

### Request Body

An array of webhook primary keys

### Returns

Empty body.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL']"
	label="API" >

<template #rest>

```
DELETE /webhooks
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	delete_webhooks_items(ids: [ID!]!): delete_many
}
```

</template>

</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```json
// DELETE /webhooks

[2, 15, 41]
```

</template>
<template #graphql>

```graphql
mutation {
	delete_webhooks_items(ids: [2, 15, 41]) {
		ids
	}
}
```

</template>
<template #js-sdk>

</template>
</SnippetToggler>

---
