---
description: REST and GraphQL API documentation to access and manage Items in Directus.
readTime: 5 min read
pageClass: page-reference
---

<script setup>
import { useLocalStorage } from '@vueuse/core';
const pref = useLocalStorage('pref', 'REST');
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

If using REST, learn more about [SEARCH](/reference/introduction#search-http-method).

### Returns

An array of up to [limit](/reference/query#limit) [item objects](#the-item-object). If no items are available, data will
be an empty array.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
GET /items/:collection
SEARCH /items/:collection
```

</template>

<template #graphql>

```
POST /graphql
```

```graphql
type Query {
	<collection>: [<collection>]
}
```

</template>

<template #js-sdk>

```js
const collection = directus.items(collection_name);

// The JS-SDK provides two methods to GET items.

// GET items by query
await collection.readByQuery(
	query // Required:  a query parameter object
);

// GET items by primary keys
await articles.readMany(
	ids_array, // Required: an array of primary keys
	query,     // Optional: a query parameter object
});
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
GET /items/articles
```

</template>
<template #graphql>

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
<template #js-sdk>

```js
const articles = directus.items('articles');

// READ BY QUERY
await articles.readByQuery({
	search: 'Directus',
	filter: {
		date_published: {
			_gte: '$NOW',
		},
	},
});

// READ ALL
await articles.readByQuery({
	// By default API limits results to 100.
	// With -1, it will return all results, but it may lead to performance degradation
	// for large result sets.
	limit: -1,
});

// READ MULTIPLE
await articles.readMany([15, 16, 17], { fields: ['title'] });
```

</template>

</SnippetToggler>

---

## Get an Item

Get an item that exists in Directus.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Returns

Returns an [item object](#the-item-object) if a valid primary key was provided.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
GET /items/:collection/:id
```

</template>

<template #graphql>

```
POST /graphql
```

```graphql
type Query {
	<collection>_by_id(id: ID!): <collection>
}
```

</template>

<template #js-sdk>

```js
const collection = directus.items(collection_name);

await collection.readOne(
	id, // primary key
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
GET /items/articles/15
```

</template>

<template #graphql>

```graphql
query {
	articles_by_id(id: 15) {
		id
		title
	}
}
```

</template>

<template #js-sdk>

```js
const articles = directus.items(articles);

await articles.readOne(15, { fields: ['title'] });
```

</template>

</SnippetToggler>

---

## Create an Item

Create a new item in the given collection.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

An array of partial [item objects](#the-item-object).

::: tip Relational Data

Relational data needs to be correctly nested to add new items successfully. Check out the
[relational data section](/reference/introduction#relational-data) for more information.

:::

### Returns

Returns the [item objects](#the-item-object) of the item that were created.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
POST /items/:collection
```

</template>

<template #graphql>

```
POST /graphql
```

```graphql
type Mutation {
	create_<collection>_item(data: create_<collection>_input): <collection>
}
```

</template>

<template #js-sdk>

```js
const collection = directus.items(collection_name);

await collection.createOne(item_object);
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

```graphql
mutation {
	create_articles_item(data: { title: "Hello world!", body: "This is our first article" }) {
		id
		title
	}
}
```

</template>

<template #js-sdk>

```js
const articles = directus.items('articles');

await articles.createOne({
	title: 'My New Article',
});
```

</template>

</SnippetToggler>

---

## Create Multiple Items

Create new items in the given collection.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

An array of partial [item objects](#the-item-object).

### Returns

Returns the [item objects](#the-item-object) of the item that were created.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
POST /items/:collection
```

</template>

<template #graphql>

```
POST /graphql
```

```graphql
type Mutation {
	create_<collection>_items(data: [create_<collection>_input]): [<collection>]
}
```

</template>

<template #js-sdk>

```js
const collection = directus.items.(collection_name);

await collection.createMany(items_array);
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

```graphql
mutation {
	create_articles_items(
		data: [
		{
			title: 'My First Title',
			body: 'My First Article',
		},
		{
			title: 'My Second Title',
			body: 'My Second Article',
		},
		]
	) {
		id
		title
	}
}
```

</template>

<template #js-sdk>

```js
const articles = directus.items('articles');

await articles.createMany([
	{
		title: 'My First Title',
		body: 'My First Article',
	},
	{
		title: 'My Second Title',
		body: 'My Second Article',
	},
]);
```

</template>

</SnippetToggler>

---

## Update an Item

Update an existing item.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

A partial [item object](#the-item-object).

### Returns

Returns the [item object](#the-item-object) of the item that was updated.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
PATCH /items/:collection/:id
```

</template>

<template #graphql>

```
POST /graphql
```

```graphql
type Mutation {
	update_<collection>_item(
		id: ID!,
		data: update_<collection>_input!
	): <collection>
}
```

</template>

<template #js-sdk>

```js
const collection = directus.items(collection_name);

await collection.updateOne(
	primary_key, // The primary key
	data, // An object { "field": "value"} to update items
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
PATCH /items/articles/15
```

```json
{
	"title": "An updated title"
}
```

</template>

<template #graphql>

```graphql
mutation {
	update_articles_item(id: 15, data: { title: "An updated title" }) {
		id
		title
	}
}
```

</template>

<template #js-sdk>

```js
const articles = directus.items('articles');

await articles.updateOne(
	42,
	{
		title: 'An updated title',
	},
	{
		fields: ['title'],
	}
);
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

### Request

An array containing primary keys of the values to update, a data object containing the field name and values to update,
and an optional query parameter.

Note the query parameter can be used to select items, instead of passing an array of primary keys.

### Returns

Returns the [item objects](#the-item-object) for the updated items.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
PATCH /items/:collection
```

</template>

<template #graphql>

```
POST /graphql
```

```graphql
type Mutation {
	update_<collection>_items(
		ids: [ID!]!,
		data: [update_<collection>_input]): [<collection>]
}
```

</template>

<template #js-sdk>

```js
const collection = directus.items.(collection_name);

await collection.updateMany(
		primary_key, // An array of primary keys
		data,		 // An object { "field": "value"} to update items
		query		 // Optional: a query parameter
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

```graphql
mutation {
	update_articles_items(ids: [1, 2], data: { status: "published" }) {
		id
		status
	}
}
```

</template>

<template #js-sdk>

```js
const articles = directus.items('articles');

await articles.updateMany(
	[15, 42],
	{
		title: 'Both articles now have the same title',
	},
	{
		fields: ['title'],
	}
);
```

</template>

</SnippetToggler>

---

## Delete an Item

Delete an existing item.

### Returns

Empty body.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
DELETE /items/:collection/:id
```

</template>

<template #graphql>

```
POST /graphql
```

```graphql
type Mutation {
	delete_<collection>_item(id: ID!): delete_one
}
```

</template>

<template #js-sdk>

```js
const collection = directus.items(collection_name);

await collection.deleteOne(primary_key);
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
DELETE /items/articles/15
```

</template>

<template #graphql>

```graphql
mutation {
	delete_articles_item(id: 15) {
		id
	}
}
```

</template>

<template #js-sdk>

```js
const articles = directus.items('articles');

await articles.deleteOne(15);
```

</template>

</SnippetToggler>

---

## Delete Multiple Items

Delete multiple existing items.

### Request

Takes an array of primary keys. Defines items to delete from the collection.

### Returns

Empty body.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
DELETE /items/:collection
```

</template>

<template #graphql>

```
POST /graphql
```

```graphql
type Mutation {
	delete_<collection>_items(ids: [ID!]!): delete_many
}
```

</template>
<template #js-sdk>

```js
const collection = directus.items(collection_name);

await collection.deleteMany(id_array);
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
DELETE /items/articles
```

```json
[15, 16, 21]
```

</template>

<template #graphql>

```graphql
mutation {
	delete_articles_items(ids: [15, 16, 21]) {
		ids
	}
}
```

</template>

<template #js-sdk>

```js
const articles = directus.items('articles');

await articles.deleteMany([15, 16, 21]);
```

</template>

</SnippetToggler>
