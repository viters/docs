---
description: REST and GraphQL API documentation on the Folders collection in Directus.
readTime: 4 min read
pageClass: page-reference
---

<script setup>
import { ref } from 'vue';

const pref = ref('REST');
</script>

# Folders

> Folders can be used to organize files within the platform. Folders are virtual, and aren't mirrored within the storage
> adapter.

---

## The Folder Object

`id` **uuid**\
Primary key of the folder.

`name` **string**\
Name of the folder.

`parent` **many-to-one**\
Parent folder. Many-to-one to folders (recursive).

```json
{
	"data": {
		"id": "fc02d733-95b8-4e27-bd4b-08a32cbe4e66",
		"name": "Test",
		"parent": null
	}
}
```

---

## Get Folders

List all folders that exist in Directus.

If using REST, learn more about using [SEARCH](/reference/introduction#search-http-method)

### Query Parameters

Supports all [global query parameters](/reference/query).

### Returns

An array of up to [limit](/reference/query#limit) [folder objects](#the-folder-object). If no items are available, data
will be an empty array.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
GET /folders
SEARCH /folders
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	folders: directus_folders
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

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
GET /folders
SEARCH /folders
```

</template>
<template #graphql>

```graphql
query {
	folders {
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

## Get a Folder

List all folders that exist in Directus.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Returns

Returns a [folder object](#the-folder-object) if a valid primary key was provided.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
GET /folders/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	folders_by_id(id: ID!): directus_folders
}
```

</template>
<template #js-sdk>

```js
const folders = directus.folders;

await folders.readOne(
	id, // Required: primary key
	query // Optional: a query parameter
);
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
GET /folders/fc02d733-95b8-4e27-bd4b-08a32cbe4e66
```

</template>
<template #graphql>

```graphql
query {
	folders_by_id(id: "fc02d733-95b8-4e27-bd4b-08a32cbe4e66") {
		name
	}
}
```

</template>
<template #js-sdk>

```js
const folders = directus.folders;

await folders.readOne('fc02d733-95b8-4e27-bd4b-08a32cbe4e66');
```

</template>

</SnippetToggler>

---

## Create a Folder

Create a new (virtual) folder.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

A partial [folder object](#the-folder-object). `name` is required.

### Returns

Returns the [folder object](#the-folder-object) of the folder that was created.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
POST /folders
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	create_folders_item(data: create_directus_folders_input): directus_folders
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

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```json
// POST /folders

{
	"name": "Nature"
}
```

</template>
<template #graphql>

```graphql
mutation {
	create_folders_item(data: { name: "Nature" }) {
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

## Create Multiple Folders

Create multiple new (virtual) folders.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

An array of partial [folder objects](#the-folder-object). `name` is required.

### Returns

Returns the [folder object](#the-folder-object) of the folder that was created.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
POST /folders
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	create_folders_items(data: [create_directus_folders_input]): [directus_folders]
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

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```json
// POST /folders

[
	{
		"name": "Nature"
	},
	{
		"name": "Cities"
	}
]
```

</template>
<template #graphql>

```graphql
mutation {
	create_folders_items(data: [{ name: "Nature" }, { name: "Cities" }]) {
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

## Update a Folder

Update an existing folder.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

A partial [folder object](#the-folder-object).

### Returns

Returns the [folder object](#the-folder-object) of the folder that was updated.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
PATCH /folders/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	update_folders_item(id: ID!, data: update_directus_folders_input): directus_folders
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

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```json
// PATCH /folders/fac21847-d5ce-4e4b-a288-9abafbdfbc87

{
	"parent": "d97c2e0e-293d-4eb5-9e1c-27d3460ad29d"
}
```

</template>
<template #graphql>

```graphql
mutation {
	update_folders_item(
		id: "fac21847-d5ce-4e4b-a288-9abafbdfbc87"
		data: { parent: "d97c2e0e-293d-4eb5-9e1c-27d3460ad29d" }
	) {
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

## Update Multiple Folders

Update multiple existing folders.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

`keys` **Required**\
Array of primary keys of the folders you'd like to update.

`data` **Required**\
Any of [the folder object](#the-folder-object)'s properties.

### Returns

Returns the [folder objects](#the-folder-object) of the folders that were updated.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
PATCH /folders
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	update_folders_items(ids: [ID!]!, data: update_directus_folders_input): [directus_folders]
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

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```json
// PATCH /folders

{
	"keys": ["fac21847-d5ce-4e4b-a288-9abafbdfbc87", "a5bdb793-dd85-4ac9-882a-b42862092983"],
	"data": {
		"parent": "d97c2e0e-293d-4eb5-9e1c-27d3460ad29d"
	}
}
```

</template>
<template #graphql>

```graphql
mutation {
	update_folders_items(
		ids: ["fac21847-d5ce-4e4b-a288-9abafbdfbc87", "a5bdb793-dd85-4ac9-882a-b42862092983"]
		data: { parent: "d97c2e0e-293d-4eb5-9e1c-27d3460ad29d" }
	) {
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

## Delete a Folder

Delete an existing folder.

::: tip Files

Any files in this folder will be moved to the root folder.

:::

### Returns

Empty body.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
DELETE /folders/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	delete_folders_item(id: ID!): delete_one
}
```

</template>

<template #js-sdk>

```js
// One
const folders = directus.folders;

await folders.deleteOne(id);
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
// DELETE /folders/a5bdb793-dd85-4ac9-882a-b42862092983
```

</template>
<template #graphql>

```graphql
mutation {
	delete_folders_item(id: "fac21847-d5ce-4e4b-a288-9abafbdfbc87") {
		id
	}
}
```

</template>
<template #js-sdk>

```js
// One
const folders = directus.folders;

await folders.deleteOne('fac21847-d5ce-4e4b-a288-9abafbdfbc87');
```

</template>

</SnippetToggler>

---

## Delete Multiple Folders

Delete multiple existing folders.

::: tip Files

Any files in these folders will be moved to the root folder.

:::

### Request

An array of folder primary keys.

### Returns

Empty body.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
DELETE /folders
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	delete_folders_items(ids: [ID!]!): delete_many
}
```

</template>
<template #js-sdk>

```js
const folders = directus.folders;

await folders.deleteMany(ids_array);
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
// DELETE /folders

["d97c2e0e-293d-4eb5-9e1c-27d3460ad29d", "fc02d733-95b8-4e27-bd4b-08a32cbe4e66"]
```

</template>
<template #graphql>

```graphql
mutation {
	delete_folders_items(ids: ["fac21847-d5ce-4e4b-a288-9abafbdfbc87", "a5bdb793-dd85-4ac9-882a-b42862092983"]) {
		ids
	}
}
```

</template>
<template #js-sdk>

```js
const folders = directus.folders;

await folders.deleteMany(['fac21847-d5ce-4e4b-a288-9abafbdfbc87', 'a5bdb793-dd85-4ac9-882a-b42862092983']);
```

</template>

</SnippetToggler>
