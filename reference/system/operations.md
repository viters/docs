---
description: REST and GraphQL API documentation on the Operations collection in Directus.
readTime: 5 min read
pageClass: page-reference
---

<script setup>
import { useLocalStorage } from '@vueuse/core';
const pref = useLocalStorage('pref', 'REST');
</script>

# Operations

> Operations are the building blocks of Data Flows within Directus.

---

## The Operation Object

`id` **uuid**\
Primary key of the operation.

`name` **string**\
Name for the operation.

`key` **string**\
Key for the operation. Must be unique within a given flow.

`type` **string**\
Type of operation. One of `log`, `mail`, `notification`, `create`, `read`, `request`, `sleep`, `transform`, `trigger`, `condition`,
or any type of custom operation extensions.

`options` **json**\
Options depending on the type of the operation.

`position_x` **integer**\
Position of the operation on the X axis within the flow workspace.

`position_y` **integer**\
Position of the operation on the Y axis within the flow workspace.

`date_created` **timestamp**\
Timestamp in ISO8601 when the operation was created.

`user_created` **many-to-one**\
The user who created the operation. Many-to-one to [users](/reference/system/users#the-users-object).

`resolve` **uuid**\
The operation triggered when the current operation succeeds (or `then` logic of a condition operation). Primary key of an
[operation](#the-operation-object).

`reject` **uuid**\
The operation triggered when the current operation fails (or `otherwise` logic of a condition operation). Primary key of
an [operation](#the-operation-object).

`flow` **many-to-one**\
The flow containing this operation. Many-to-one to [flows](/reference/system/flows#the-flow-object).

```json
{
	"id": "585b04cd-2821-4dcc-a563-ae5d29ecace2",
	"name": "Log a Message",
	"key": "log_message",
	"type": "log",
	"position_x": 12,
	"position_y": 24,
	"date_created": "2022-05-11T13:14:52Z",
	"user_created": "12e62fd0-29c7-4fd3-b3d3-c7a39933e8af",
	"resolve": "bf4099c0-c54c-4736-ab4e-95e2487595e4",
	"reject": null,
	"flow": "22544db5-93f7-48e2-a028-7ae02c8fe49a"
}
```

---

## List Operations

List all operations that exist in Directus.

If using REST, learn more about using [SEARCH](/reference/introduction#search-http-method)

### Query Parameters

Supports all [global query parameters](/reference/query).

### Returns

An array of up to [limit](/reference/query#limit) [operation objects](#the-operation-object). If no items are available,
data will be an empty array.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
GET /operations
SEARCH /operations
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	operations: [directus_operations]
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
GET /operations
SEARCH /operations
```

</template>
<template #graphql>

```graphql
query {
	operations {
		id
		name
		key
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

## Retrieve an Operation

List an existing operation by primary key.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Returns

Returns the requested [operation object](#the-operation-object).

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
GET /operations/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	operations_by_id(id: ID!): directus_operations
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
GET /operations/3c636d1c-4eb2-49cd-8a6d-3ec571ab3390
```

</template>
<template #graphql>

```graphql
query {
	operations_by_id(id: 42) {
		id
		name
		key
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

## Create an Operation

Create a new operation.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

A partial [operation object](#the-operation-object).

### Returns

Returns the [operation object](#the-operation-object) for the created operation.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
POST /operations
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	create_operations_item(data: create_directus_operations_input!): directus_operations
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
// POST /operations

{
	"name": "My Log",
	"key": "my_log",
	"type": "log"
}
```

</template>
<template #graphql>

```graphql
mutation {
	create_operations_item(data: { name: "My Log", key: "my_log", type: "log" }) {
		id
		name
		key
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

## Create Multiple Operations

Create multiple new operations.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

An array of partial [operation objects](#the-operation-object).

### Returns

Returns the [operation object](#the-operation-object) for the created operation.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
POST /operations
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	create_operations_items(data: [create_directus_operations_input!]!): [directus_operations]
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
// POST /operations

[
	{
		"name": "My Log",
		"key": "my_log",
		"type": "log"
	},
	{
		"name": "Send Notification",
		"key": "send_notification",
		"type": "notification"
	}
]
```

</template>
<template #graphql>

```graphql
mutation {
	create_operations_items(
		data: [
			{
				"name": "My Log",
				"key": "my_log",
				"type": "log"
			},
			{
				"name": "Send Notification",
				"key": "send_notification",
				"type": "notification"
			}
		]
	) {
		id
		name
		key
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

## Update an Operation

Update an existing operation.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

A partial [operation object](#the-operation-object).

### Returns

Returns the [operation object](#the-operation-object) for the updated operation.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
PATCH /operation/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	update_operations_item(id: ID!, data: update_directus_operations_input): directus_operations
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
// PATCH /operation/7d62f1e9-a83f-407b-84f8-1c184f014501

{
	"name": "My Updated Operation"
}
```

</template>
<template #graphql>

```graphql
mutation {
	update_operations_item(id: "7d62f1e9-a83f-407b-84f8-1c184f014501", data: { name: "My Updated Operation" }) {
		id
		name
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

## Update Multiple Operations

Update multiple existing operations.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

`keys` **array**\
Required. Array of primary keys of the operations you'd like to update.

`data` **object**\
Required. Any of [the operation object](#the-operation-object)'s properties.

### Returns

Returns the [operation objects](#the-operation-object) for the updated operations.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
PATCH /operations
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	update_operations_items(ids: [ID!]!, data: update_directus_operations_input): [directus_operations]
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
// PATCH /operations

{
	"keys": ["6a25fb7c-26a4-4dcb-a474-d47b6a203a38", "07ac467e-1900-4c62-9637-8dac2ab97f71"],
	"data": {
		"name": "Updated Operations"
	}
}
```

</template>
<template #graphql>

```graphql
mutation {
	update_operations_items(
		ids: ["6a25fb7c-26a4-4dcb-a474-d47b6a203a38", "07ac467e-1900-4c62-9637-8dac2ab97f71"]
		data: { name: "Updated Operations" }
	) {
		id
		name
		key
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

## Delete an Operation

Delete an existing operation.

### Returns

Empty body.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
DELETE /operations/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	delete_operations_item(id: ID!): delete_one
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
DELETE /operations/07ac467e-1900-4c62-9637-8dac2ab97f71
```

</template>
<template #graphql>

```graphql
mutation {
	delete_operations_item(id: "07ac467e-1900-4c62-9637-8dac2ab97f71") {
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

## Delete Multiple Operations

Delete multiple existing operations.

### Request

An array of operations primary keys

### Returns

Empty body.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
DELETE /operations
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	delete_operations_items(ids: [ID!]!): delete_many
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
// DELETE /operations
["a791ce73-41a2-4fb7-8f67-c7ba176cc719", "4e57ab0e-f4ec-47b5-9dad-e36f08a25642", "5fe0a6f6-18ad-4bb3-94c6-2e033246c784"]
```

</template>
<template #graphql>

```graphql
mutation {
	delete_operations_items(
		ids: [
			"a791ce73-41a2-4fb7-8f67-c7ba176cc719"
			"4e57ab0e-f4ec-47b5-9dad-e36f08a25642"
			"5fe0a6f6-18ad-4bb3-94c6-2e033246c784"
		]
	) {
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

## Trigger an Operation

Trigger an operation based on primary key.

### Request

Payload for the operation, if needed.

### Returns

Result of the operation, if any.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
POST /operations/trigger/:operation_uuid
```

</template>
<template #graphql>

```graphql

# Not currently available for GraphQL.

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
// POST /flows/trigger/202a940b-a00b-47df-b832-369c53f13122
// Payload here
```

</template>
<template #graphql>

```graphql

# Not currently available for GraphQL.

```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>
