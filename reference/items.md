---
description: REST and GraphQL API documentation to access and manage Items in Directus.
readTime: 5 min read
pageClass: page-reference
---

<script setup>
import { ref } from 'vue';

import SnippetToggler from '../.vitepress/theme/components/SnippetToggler.vue';

const pref = ref('REST');
</script>

# Accessing Items

> Items are individual pieces of data in your database. They can be anything, from articles, to IoT status checks.
> [Learn more about Items](/getting-started/glossary#items).

---

## The Item Object

Items don't have a predefined schema. The format depends completely on how you configured your collections and fields in
Directus. For the sake of documentation, we'll use a fictional articles collection with the following fields: `id`,
`status`, `title`, `body`, `featured_image`, and `author`.

::: tip Relational Data

Please see [Relational Data](/reference/introduction#relational-data) and [Field Parameters](/reference/query#fields) to
learn more.

:::

```json
{
	"id": 1,
	"status": "published",
	"title": "Hello, world!",
	"body": "This is my first article",
	"featured_image": "768eabec-3c54-4110-a6bb-64b548116661",
	"author": "0bc7b36a-9ba9-4ce0-83f0-0a526f354e07"
}
```

---

## Get Items

List all items that exist in Directus.

:::tip Singleton

If your collection is a Singleton, this endpoint will return the item. If the item doesn't exist in the database, the
default values will be returned.

:::

### Query Parameters

Supports all [global query parameters](/reference/query).

::: tip Relational Data

The [Field Parameter](/reference/query#fields) is required to return nested relational data.

:::

### Returns

An array of up to [limit](/reference/query#limit) [item objects](#the-item-object). If no items are available, data will
be an empty array.

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL']"
	label="API" >

<template #rest>

### Syntax

```
GET /items/:collection
SEARCH /items/:collection
```

[Learn more about SEARCH ->](/reference/introduction#search-http-method)

### Example

```
GET /items/articles
```

</template>

<template #graphql>

### Syntax

```
POST /graphql
```

```graphql
type Query {
	<collection>: [<collection>]
}
```

### Example

```graphql
query {
	articles {
		id
		title
		author {
			first_name
		}
	}
}
```

</template>

</SnippetToggler>

---

## Get Item by ID

Get an item that exists in Directus.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Returns

Returns an [item object](#the-item-object) if a valid primary key was provided.

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL']"
	label="API" >

<template #rest>

### Syntax

```
GET /items/:collection/:id
```

### Example

```
GET /items/articles/15
```

</template>

<template #graphql>

### Syntax

```
POST /graphql
```

```graphql
type Query {
	<collection>_by_id(id: ID!): <collection>
}
```

### Example

```graphql
query {
	articles_by_id(id: 15) {
		id
		title
	}
}
```

</template>

</SnippetToggler>

---

## Create an Item

Create a new item in the given collection.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request Body

An array of partial [item objects](#the-item-object).

::: tip Relational Data

Relational data needs to be correctly nested to add new items successfully. Check out the
[relational data section](/reference/introduction#relational-data) for more information.

:::

### Returns

Returns the [item objects](#the-item-object) of the item that were created.

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL']"
	label="API" >

<template #rest>

### Syntax

```
POST /items/:collection
```

### Example

```
POST /items/articles
```

```json
{
	"title": "Hello world!",
	"body": "This is our first article"
}
```

</template>

<template #graphql>

### Syntax

```
POST /graphql
```

```graphql
type Mutation {
	create_<collection>_item(data: create_<collection>_input): <collection>
}
```

### Example

```graphql
mutation {
	create_articles_item(data: { title: "Hello world!", body: "This is our first article" }) {
		id
		title
	}
}
```

</template>

</SnippetToggler>

---

## Create Multiple Items

Create new items in the given collection.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request Body

An array of partial [item objects](#the-item-object).

### Returns

Returns the [item objects](#the-item-object) of the item that were created.

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL']"
	label="API" >

<template #rest>

### Syntax

```
POST /items/:collection
```

### Example

```
POST /items/articles
```

```json
[
	{
		"title": "Hello world!",
		"body": "This is our first article"
	},
	{
		"title": "Hello again, world!",
		"body": "This is our second article"
	}
]
```

</template>

<template #graphql>

### Syntax

```
POST /graphql
```

```graphql
type Mutation {
	create_<collection>_items(data: [create_<collection>_input]): [<collection>]
}
```

### Example

```graphql
mutation {
	create_articles_items(
		data: [
			{ title: "Hello world!", body: "This is our first article" }
			{ title: "Hello again, world!", body: "This is our second article" }
		]
	) {
		id
		title
	}
}
```

</template>

</SnippetToggler>

---

## Update an Item

Update an existing item.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request Body

A partial [item object](#the-item-object).

### Returns

Returns the [item object](#the-item-object) of the item that was updated.

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL']"
	label="API" >

<template #rest>

### Syntax

```
PATCH /items/:collection/:id
```

### Example

```
PATCH /items/articles/15
```

```json
{
	"title": "An updated title"
}
```

</template>

<template #graphql>

### Syntax

```
POST /graphql
```

```graphql
type Mutation {
	update_<collection>_item(id: ID!, data: update_<collection>_input!): <collection>
}
```

### Example

```graphql
mutation {
	update_articles_item(id: 15, data: { title: "An updated title" }) {
		id
		title
	}
}
```

</template>

</SnippetToggler>

---

## Update Multiple Items

Update multiple items at the same time.

:::tip Singleton

If your collection is a Singleton, this endpoint will act the same as the [Update an Item](#update-an-item) endpoint.

:::

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request Body

Object containing `data` for the values to set, and either `keys` or `query` to select what items to update.

### Returns

Returns the [item objects](#the-item-object) for the updated items.

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL']"
	label="API" >

<template #rest>

### Syntax

```
PATCH /items/:collection
```

### Example

```
PATCH /items/articles
```

```json
{
	"keys": [1, 2],
	"data": {
		"status": "published"
	}
}
```

</template>

<template #graphql>

### Syntax

```
POST /graphql
```

```graphql
type Mutation {
	update_<collection>_items(ids: [ID!]!, data: [update_<collection>_input]): [<collection>]
}
```

### Example

```graphql
mutation {
	update_articles_items(ids: [1, 2], data: { status: "published" }) {
		id
		status
	}
}
```

</template>

</SnippetToggler>

---

## Delete an Item

Delete an existing item.

### Returns

Empty body. <SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL']"
	label="API" >

<template #rest>

### Syntax

```
DELETE /items/:collection/:id
```

### Example

```
DELETE /items/articles/15
```

</template>

<template #graphql>

### Syntax

```
POST /graphql
```

```graphql
type Mutation {
	delete_<collection>_item(id: ID!): delete_one
}
```

### Example

```graphql
mutation {
	delete_articles_item(id: 15) {
		id
	}
}
```

</template>

</SnippetToggler>

---

## Delete Multiple Items

Delete multiple existing items.

### Request Body

An array of item primary keys.

### Returns

Empty body.

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL']"
	label="API" >

<template #rest>

### Syntax

```
DELETE /items/:collection
```

### Example

```
DELETE /items/articles
```

```json
[15, 16, 21]
```

</template>

<template #graphql>

### Syntax

```
POST /graphql
```

```graphql
type Mutation {
	delete_<collection>_items(ids: [ID!]!): delete_many
}
```

### Example

```graphql
mutation {
	delete_articles_items(ids: [15, 16, 21]) {
		ids
	}
}
```

</template>

</SnippetToggler>
