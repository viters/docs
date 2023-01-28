---
description: REST and GraphQL API documentation on the Presets collection in Directus.
readTime: 5 min read
pageClass: page-reference
---

<script setup>
import { ref } from 'vue';

import { SnippetToggler } from '@directus/vue-snippet-toggler';
import '@directus/vue-snippet-toggler/style.css';

const pref = ref('REST');
</script>

# Preset

> Presets hold the preferences of individual users of the platform. This allows Directus to show and maintain custom
> item listings and bookmarks for users of the app. [Learn more about Presets](/getting-started/glossary#presets).

---

## The Preset Object

`id` **uuid**\
Primary key of the preset.

`bookmark` **string**\
The title of the bookmark. If this value is `null`, it's considered a preset instead of a bookmark.

`user` **many-to-one**\
User this preset applies to. Many-to-one to [users](/reference/system/users).

`role` **many-to-one**\
Role this preset applies to. Many-to-one to [users](/reference/system/users).

`collection` **string**\
Collection this preset applies to.

`search` **string**\
The search query used in the preset.

`filters` **array**\
The filters used in the preset.

`layout` **string**\
The layout used in this preset.

`layout_query` **object**\
The item query used by the layout. This structure is based on the used layout.

`layout_options` **object**\
The options used by the layout. This structure is based on the used layout.

```json
{
	"id": 39,
	"bookmark": null,
	"user": "410b5772-e63f-4ae6-9ea2-39c3a31bd6ca",
	"role": null,
	"collection": "directus_activity",
	"search": null,
	"filters": [],
	"layout": "tabular",
	"layout_query": {
		"tabular": {
			"sort": "-timestamp",
			"fields": ["action", "collection", "timestamp", "user"],
			"page": 1
		}
	},
	"layout_options": {
		"tabular": {
			"widths": {
				"action": 100,
				"collection": 210,
				"timestamp": 240,
				"user": 240
			}
		}
	}
}
```

---

## List Presets

List all presets that exist in Directus.

If using REST, learn more about using [SEARCH](/reference/introduction#search-http-method)

::: tip Permissions

The data returned in this endpoint will be filtered based on the user's permissions. For example, presets for a role
other than the current user's role won't be returned.

:::

### Query Parameters

Supports all [global query parameters](/reference/query).

### Returns

An array of up to [limit](/reference/query#limit) [preset objects](#the-preset-object). If no items are available, data
will be an empty array.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
GET /presets
SEARCH /presets
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	presets: [directus_presets]
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
GET /presets
SEARCH /presets
```

</template>
<template #graphql>

```graphql
query {
	presets {
		id
		user
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

## Retrieve a Preset

List an existing preset by primary key.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Returns

Returns the requested [preset object](#the-preset-object).

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
GET /presets/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	presets_by_id(id: ID!): directus_presets
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
GET /presets/42
```

</template>
<template #graphql>

```graphql
query {
	presets_by_id(id: 42) {
		id
		user
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

## Create a Preset

Create a new preset.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

A partial [preset object](#the-preset-object).

### Returns

Returns the [preset object](#the-preset-object) for the created preset.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
POST /presets
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	create_presets_item(data: create_directus_presets_input!): directus_presets
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
// POST /presets

{
	"user": "410b5772-e63f-4ae6-9ea2-39c3a31bd6ca",
	"layout": "cards",
	"search": "Directus"
}
```

</template>
<template #graphql>

```graphql
mutation {
	create_presets_item(data: { user: "410b5772-e63f-4ae6-9ea2-39c3a31bd6ca", layout: "cards", search: "Directus" }) {
		id
		user
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

## Create Multiple Presets

Create multiple new presets.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

An array of partial [preset objects](#the-preset-object).

### Returns

Returns the [preset object](#the-preset-object) for the created preset.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
POST /presets
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	create_presets_items(data: [create_directus_presets_input!]!): [directus_presets]
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
// POST /presets

[
	{
		"collection": "directus_files",
		"user": "410b5772-e63f-4ae6-9ea2-39c3a31bd6ca",
		"layout": "cards",
		"search": "Directus"
	},
	{
		"collection": "articles",
		"user": "410b5772-e63f-4ae6-9ea2-39c3a31bd6ca",
		"layout": "tabular"
	}
]
```

</template>
<template #graphql>

```graphql
mutation {
	create_presets_items(
		data: [
			{
				collection: "directus_files"
				user: "410b5772-e63f-4ae6-9ea2-39c3a31bd6ca"
				layout: "cards"
				search: "Directus"
			}
			{ collection: "articles", user: "410b5772-e63f-4ae6-9ea2-39c3a31bd6ca", layout: "tabular" }
		]
	) {
		id
		user
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

## Update a Preset

Update an existing preset.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

A partial [preset object](#the-preset-object).

### Returns

Returns the [preset object](#the-preset-object) for the updated preset.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
PATCH /presets/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	update_presets_item(id: ID!, data: update_directus_presets_input): directus_presets
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
// PATCH /presets/34

{
	"layout": "tabular"
}
```

</template>
<template #graphql>

```graphql
mutation {
	update_presets_item(id: 32, data: { layout: "tabular" }) {
		id
		user
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

## Update Multiple Presets

Update multiple existing presets.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

`keys` **Required**\
Array of primary keys of the presets you'd like to update.

`data` **Required**\
Any of [the preset object](#the-preset-object)'s properties.

### Returns

Returns the [preset objects](#the-preset-object) for the updated presets.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
PATCH /presets
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	update_presets_items(ids: [ID!]!, data: update_directus_presets_input): [directus_presets]
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
// PATCH /presets

{
	"keys": [15, 64],
	"data": {
		"layout": "tabular"
	}
}
```

</template>
<template #graphql>

```graphql
mutation {
	update_presets_items(ids: [15, 64], data: { layout: "tabular" }) {
		id
		user
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

## Delete a Preset

Delete an existing preset.

### Returns

Empty body.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
DELETE /presets/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	delete_presets_item(id: ID!): delete_one
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
DELETE /presets/34
```

</template>
<template #graphql>

```graphql
mutation {
	delete_presets_item(id: 32) {
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

## Delete Multiple Presets

Delete multiple existing presets.

### Request

An array of preset primary keys

### Returns

Empty body.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
DELETE /presets
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	delete_presets_items(ids: [ID!]!): delete_many
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
// DELETE /presets

[15, 251, 810]
```

</template>
<template #graphql>

```graphql
mutation {
	delete_presets_items(ids: [15, 251, 810]) {
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
