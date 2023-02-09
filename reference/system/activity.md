---
description: REST and GraphQL API documentation on the Activity collection in Directus.
readTime: 4 min read
pageClass: page-reference
---

<script setup>
import { useLocalStorage } from '@vueuse/core';
const pref = useLocalStorage('pref', 'REST');
</script>

# Activity

> All events within Directus are tracked and stored in the activities collection. This gives you full accountability
> over everything that happens. [Learn more about Activity](/getting-started/glossary#activity).

---

## The Activity Object

`action` **string**\
Action that was performed.

`collection` **string**\
Collection identifier in which the item resides.

`comment` **string**\
User comment. This will store the comments that show up in the right sidebar of the item edit page in the admin app.

`id` **integer**\
Unique identifier for the object.

`ip` **string**\
The IP address of the user at the time the action took place.

`item` **string**\
Unique identifier for the item the action applied to. This is always a string, even for integer primary keys.

`timestamp` **string**\
When the action happened.

`user` **many-to-one**\
The user who performed this action. Many-to-one to [users](/reference/system/users#the-users-object).

`user_agent` **string**\
User agent string of the browser the user used when the action took place.

`revisions` **one-to-many**\
Any changes that were made in this activity. One-to-many to [revisions](/reference/system/revisions#the-revisions-object).

```json
{
	"action": "create",
	"collection": "articles",
	"comment": null,
	"id": 5,
	"ip": "139.178.128.0",
	"item": "1",
	"timestamp": "2021-02-02T12:50:26-05:00",
	"user": "2d321940-69f5-445f-be6b-c773fa58a820",
	"user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Safari/605.1.15",
	"revisions": [4]
}
```

---

## Get Activities

Returns a list of activity actions.

### Query Parameters

Supports all [global query parameters](/reference/query).

If using REST, learn more about using [SEARCH](/reference/introduction#search-http-method)

### Returns

An array of up to [limit](/reference/query#limit) [activity objects](#the-activity-object). If no items are available,
data will be an empty array.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API" >

<template #rest>

```
GET /activity
SEARCH /activity
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	activity: [directus_activity]
}
```

</template>

<template #js-sdk>

```js
// The JS-SDK provides two methods to GET items.

const collection = directus.activity;

// GET items by query
await collection.readByQuery(
	query // Required:  a query parameter object
);

// GET items by primary keys
await articles.readMany(
	primaryKeys, // Required: an array of primary keys
	query // Optional: a query parameter object
);
```

</template>

</SnippetToggler>

### Example

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
GET /activity
SEARCH /activity
```

</template>
<template #graphql>

```graphql
query {
	activity {
		...
	}
}
```

</template>
<template #js-sdk>

```js
// READ BY QUERY
await activity.readByQuery({
	search: 'Looks Good',
	filter: {
		timestamp: {
			_gte: '$NOW',
		},
	},
});

// READ ALL
await activity.readByQuery({
	// By default API limits results to 100.
	// With -1, it will return all results, but it may lead to performance degradation
	// for large result sets.
	limit: -1,
});

// READ MULTIPLE
await activity.readMany([15, 16, 17], { fields: ['comment'] });
```

</template>

</SnippetToggler>

---

## Get Activity By ID

Returns a single activity action by primary key.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Returns

Returns an [activity object](#the-activity-object) if a valid identifier was provided.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API" >

<template #rest>

```
GET /activity/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	activity_by_id(id: ID!): directus_activity
}
```

</template>
<template #js-sdk>

```js
const activity = directus.activity;

await activity.readOne(
	id, // primary key
	query // Optional: a query parameter
);
```

</template>

</SnippetToggler>

### Example

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
GET /activity/15
```

</template>
<template #graphql>

```graphql
query {
	activity_by_id(id: 15) {
		...
	}
}
```

</template>
<template #js-sdk>

```js
const activity = directus.activity;

await activity.readOne(15, { fields: ['title'] });
```

</template>

</SnippetToggler>

---

## Create a Comment

Creates a new comment on a given item.

### Request

`collection` **Required**\
Collection in which the item resides.

`item` **Required**\
Primary Key of the item to comment on.

`comment` **Required**\
The comment content. Supports Markdown.

### Returns

Returns the [activity object](#the-activity-object) of the created comment.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API" >

<template #rest>

```
POST /activity/comment
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	create_comment(collection: String!, item: ID!, comment: String!): directus_activity
}
```

</template>
<template #js-sdk>

```js
const activity = directus.activity;

await activity.createOne({
	item,
	collection,
	comment,
});
```

</template>

</SnippetToggler>

### Example

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```json
// POST /activity/comment

{
	"collection": "pages",
	"item": 3,
	"comment": "Hello World"
}
```

</template>
<template #graphql>

```graphql
mutation {
	create_comment(
		collection: "pages",
		item: 3,
		comment: "Hello World"
	) { ... }
}
```

</template>
<template #js-sdk>

```js
const activity = directus.activity;

await activity.createOne({
	item: 3,
	collection: 'pages',
	comment: 'Hello World',
});
```

</template>

</SnippetToggler>

---

## Update a Comment

Updates an existing comment by activity action primary key.

### Request

`id` **Required**

- **Type** — `String`
- **Description** — An existing primary key.

`comment` **Required**

- **Type** — `Object`
- **Description** — The updated comment content. Supports Markdown.

### Returns

Returns the [activity object](#the-activity-object) of the created comment.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API" >

<template #rest>

```
PATCH /activity/comment/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	update_comment(id: ID!, comment: String!): directus_activity
}
```

</template>
<template #js-sdk>

```js
const activity = directus.activity;

await activity.updateOne(primaryKey, comment);
```

</template>

</SnippetToggler>

### Example

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```json
// PATCH /activity/comment/15

{
	"comment": "Hello World!!"
}
```

</template>
<template #graphql>

```graphql
mutation {
	update_comment(
		id: 3,
		comment: "Hello World",
	) { ... }
}
```

</template>
<template #js-sdk>

```js
const activity = directus.activity;

await activity.updateOne(42, {
	comment: 'Hello World!!',
});
```

</template>

</SnippetToggler>

---

## Delete a Comment

Deletes a comment.

### Request

The primary key of the item to delete.

### Returns

Empty Body.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API" >

<template #rest>

```
DELETE /activity/comment/:id
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	delete_comment(id: ID): delete_one
}
```

</template>
<template #js-sdk>

```js
const activity = directus.activity;

await activity.deleteOne(primaryKey);
```

</template>

</SnippetToggler>

### Example

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
DELETE /activity/comment/15
```

</template>
<template #graphql>

```graphql
mutation {
	delete_comment(id: 3) {
		id
	}
}
```

</template>
<template #js-sdk>

```js
const activity = directus.activity;

await activity.deleteOne(15);
```

</template>

</SnippetToggler>
