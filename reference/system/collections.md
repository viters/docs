---
description: REST and GraphQL API documentation on the "Collections" collection in Directus.
readTime: 5 min read
pageClass: page-reference
---

<script setup>
import { ref } from 'vue';

import { SnippetToggler } from '@directus/vue-snippet-toggler';
import '@directus/vue-snippet-toggler/style.css';
const pref = ref('REST');
</script>

# Collections

> Collections are the individual collections of items, similar to tables in a database. Changes to collections will
> alter the schema of the database. [Learn more about Collections](/getting-started/glossary#collections).

---

## The Collection Object

`collection` **string**\
Name of the collection. This matches the table name in the database.

#### Meta

Directus metadata, primarily used in the Admin App.

`collection` **string**\
Name of the collection. This matches the table name in the database.

`icon` **string**\
Icon displayed in the Admin App when working with this collection.

`note` **string**\
Short description displayed in the Admin App.

`display_template` **string**\
How items in this collection should be displayed when viewed relationally in the Admin App.

`hidden` **boolean**\
Whether or not this collection is hidden in the Admin App.

`singleton` **boolean**\
Whether or not this collection is treated as a singleton.

`translations` **array**\
How this collection's name is displayed in the different languages in the Admin App.

`archive_field` **string**\
What field in the collection holds the archived state.

`archive_value` **string**\
What value the archive field should be set to when archiving an item.

`unarchive_value` **string**\
What value the archive field should be set to when unarchiving an item.

`archive_app_filter` **boolean**\
Whether or not the Admin App should allow the user to view archived items.

`sort_field` **boolean**\
What field holds the sort value on the collection. The Admin App uses this to allow drag-and-drop manual sorting.

`accountability` **string**\
What data is tracked. One of `all`, `activity`. See [Accountability](/configuration/data-model#accountability) for more information.

`item_duplication_fields` **array**\
What fields are duplicated during "Save as copy" action of an item in this collection. See [Duplication](/configuration/data-model#duplication)
for more information.

`group` **string**\
The name of the parent collection. This is used in [grouping/nesting of collections](/configuration/data-model#sorting-grouping).

`sort` **number**\
What sort order of the collection relative to other collections of the same level. This is used in [sorting of collections](/configuration/data-model#sorting-grouping).

`collapse` **string**\
What is the default behavior of this collection or "folder" collection when it has nested collections. One of `open`, `closed`,
`locked`.

#### Schema

"Raw" database information. Based on the database vendor used, different information might be returned. The following
are available for all drivers.

`name` **string**\
The table name.

`comment` **string**\
The table comment.

::: tip

["folder" collections do not hold any data](/configuration/data-model#sorting-grouping), hence their schema would be
`null`.

:::

```json
{
	"collection": "articles",
	"meta": {
		"collection": "articles",
		"icon": "article",
		"note": "Blog posts",
		"display_template": "{{ title }}",
		"hidden": false,
		"singleton": false,
		"translations": [
			{
				"language": "en-US",
				"translation": "Articles"
			},
			{
				"language": "nl-NL",
				"translation": "Artikelen"
			}
		],
		"archive_field": "status",
		"archive_value": "archived",
		"unarchive_value": "draft",
		"archive_app_filter": true,
		"sort_field": "sort",
		"item_duplication_fields": null,
		"sort": 1
	},
	"schema": {
		"name": "pages",
		"comment": null
	}
}
```

---

## Get Collections

List the available collections.

If using REST, learn more about using [SEARCH](/reference/introduction#search-http-method)

### Query Parameters

This endpoint doesn't currently support any query parameters.

### Returns

An array of [collection objects](#the-collection-object).

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
GET /collections
SEARCH /collections
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	collections: [directus_collections]
}
```

</template>

<template #js-sdk>

```js
// The JS-SDK provides two methods to GET items.

const collections = directus.collections;

// GET items by query
await collections.readByQuery(
	query // Required:  a query parameter object
);

// GET items by primary keys
await collections.readMany(
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
GET /collections
SEARCH /collections
```

</template>
<template #graphql>

```graphql
query {
	collections {
		...
	}
}
```

</template>
<template #js-sdk>

```js
const collections = directus.collections;

// READ BY QUERY
await collections.readByQuery({
	search: 'transactions',
	},
});

// READ ALL
await collections.readByQuery({
	// By default API limits results to 100.
	// With -1, it will return all results, but it may lead to performance degradation
	// for large result sets.
	limit: -1,
});

// READ MULTIPLE
await collections.readMany(['transactions', 'testimonials'], { fields: ['meta'] });
```

</template>

</SnippetToggler>

---

## Get a Collection by ID

Retrieve a single collection by table name.

### Query Parameters

This endpoint doesn't currently support any query parameters.

### Request Body

None

### Returns

A [collection object](#the-collection-object).

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
GET /collections/:collection
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	collections_by_name(name: String!): directus_collections
}
```

</template>

<template #js-sdk>

```js
const collections = directus.collections;

await collections.readOne(collection_name);
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
GET /collections/articles
```

</template>
<template #graphql>

```graphql
query {
	collections_by_name(name: "articles") {
		...
	}
}
```

</template>
<template #js-sdk>

```js
const collections = directus.collections;

await collections.readOne('articles');
```

</template>

</SnippetToggler>

---

## Create a Collection

Create a new Collection. This will create a new table in the database as well.

### Query Parameters

This endpoint doesn't currently support any query parameters.

### Request Body

The `collection` property is required, all other properties of the [collection object](#the-collection-object) are
optional.

You are able to provide an array of `fields` to be created during the creation of the collection. See the
[fields object](/reference/system/fields#the-fields-object) for more information on what properties are available in a
field.

### Returns

The [collection object](#the-collection-object) for the collection created in this request.

::: tip

Make sure to pass an empty object for schema (`schema: {}`) when creating collections. Alternatively, you can omit it
entirely or use `schema: null` to create ["folder" collections](/configuration/data-model#sorting-grouping).

:::

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
POST /collections
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	create_collections_item(data: directus_collections): directus_collections
}
```

</template>

<template #js-sdk>

```js
const collections = directus.collections;

await collections.createOne(collections, meta);
```

</template>

</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```json
// POST /collections

{
	"collection": "testimonials",
	"meta": {
		"icon": "format_quote"
	}
}
```

</template>
<template #graphql>

```graphql
mutation {
	create_collections_item(data: {
		collection: "testimonials",
		meta: {
			icon: "format_quote"
		}
	}) {
		...
	}
}
```

</template>
<template #js-sdk>

```js
const collections = directus.collections;

await articles.createOne('testimonials', {
	meta: {
		note: 'Short quotes from happy customers.',
	},
});
```

</template>

</SnippetToggler>

---

## Update a Collection

Update the metadata for an existing collection.

:::tip

You can only update the `meta` values of the [collection object](#the-collection-object). Updating the collection name
is not supported at this time.

:::

### Query Parameters

This endpoint doesn't currently support any query parameters.

### Request Body

`collection` **Required**

- **Type** — `String`
- **Description** — The name of the collection.

`meta` **Required**

- **Type** — `Object`
- **Description** — For details, see the [collection object](#the-collection-object).

### Returns

The [collection object](#the-collection-object) for the updated collection in this request.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
PATCH /collections/:collection
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	update_collections_item(collection: String!, data: update_directus_collections_input!): directus_collections
}
```

</template>

<template #js-sdk>

```js
const collections = directus.collections;

await collections.updateOne({
	collection_name,
	meta,
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

```json
// PATCH /collections/testimonials

{
	"meta": {
		"note": "Short quotes from happy customers."
	}
}
```

</template>
<template #graphql>

```graphql
mutation {
	update_collections_item(collection: "testimonials", data: { meta: { note: "Short quotes from happy customers." } }) {
		collection
	}
}
```

</template>

<template #js-sdk>

```js
const collections = directus.collections;

await articles.updateOne({
	"testimonials",
	{
	"meta": {
		"note": "Short quotes from happy customers."
		}
	}
}
```

</template>

</SnippetToggler>

---

## Delete a Collection

Delete a collection.

::: danger Destructive

Be aware, this will delete the table from the database, including all items in it. This action can't be undone.

:::

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
DELETE /collections/:collection
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	delete_collections_item(collection: String!): delete_collection
}
```

</template>
<template #js-sdk>

```js
// One
const collections = directus.collections;

await collections.deleteOne(collection_name);
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
DELETE /collections/articles
```

</template>
<template #graphql>

```graphql
mutation {
	delete_collections_item(collection: "articles") {
		collection
	}
}
```

</template>
<template #js-sdk>

```js
// One
const collections = directus.collections;

await collections.deleteOne('transactions');
```

</template>

</SnippetToggler>
