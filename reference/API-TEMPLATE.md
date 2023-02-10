---
description: A brief description, for SEO.
readTime: 5-min read
pageClass: page-reference
---

<script setup>
import { ref } from 'vue';

import { SnippetToggler } from '@directus/vue-snippet-toggler';
import '@directus/vue-snippet-toggler/style.css';

const pref = ref('REST');
</script>

# Items

> This endpoint handles x, y, and z within Directus. Some examples include a, b and c. Learn more about
> [items](/getting-started/glossary#items).

---

## The Item Object

One or two sentence description of what endpoint does.

:::tip

Tips can be added as needed. You can also use `:::warning` (renders yellow) and `:::danger` (renders red). See the
[VitePress documentation](https://vitepress.vuejs.org/) for more details.

:::

```json
{
	// Provide the JSON object of a returned item's fields with semi-realistic sample data.
}
```

---

## Get Multiple Items

Description of the method.

### Query Parameters

<!-- Use the appropriate description. -->

<!-- Supports all [query parameters](/reference/query). -->
<!-- Supports x, y and z [query parameters](/reference/query).  -->
<!-- Does not support [query parameters](/reference/query). -->

If using REST, learn more about [SEARCH](/reference/introduction#search-http-method).

### Request Body

<!-- Use the appropriate description. -->

<!-- No options available for the request. -->
<!--
// Use the following format for each available option.

#### `primaryKeys` **Required** || **Optional**
- **Type** — `Array`
- **Description** — An array of primary keys.
- **Default** — N/A || Defaults to xyz .
-->

### Returns

<!-- Use the appropriate description. -->

<!-- Returns xxxxx. -->
<!-- Empty Body. -->

<!-- Under this "Syntax" section, demonstrate the endpoint with generic variable names.  -->

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
GET /items/:collectionName
SEARCH /items/:collectionName
```

</template>

<template #graphql>

```graphql
# Endpoint
# POST /graphql

# Request Body
type Query {
	collections: [collection]
}
```

</template>

<template #js-sdk>

```js
const articles = directus.items('articles')

// The JS-SDK provides two methods to GET items.

// GET items by query
await articles.readByQuery(
	query // Required:  a query parameter object
);

// GET items by primary keys
await articles.readMany(
	primaryKeys, // Required: an array of primary keys
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

<!--
For the rest of the endpoints,
you can use these naming conventions
and copy/paste/modify the section above:

## Get an Item
## Create an Item
## Create Multiple items
## Update an Item
## Update Multiple Items
## Delete an Item
## Delete Multiple Items
-->
