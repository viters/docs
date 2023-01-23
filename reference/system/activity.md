---
description: REST and GraphQL API documentation on the Activity collection in Directus.
readTime: 4 min read
pageClass: page-reference
---

<script setup>
import { ref } from 'vue';

import { SnippetToggler } from '@directus/vue-snippet-toggler';
import '@directus/vue-snippet-toggler/style.css';

const pref = ref('REST');
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

## List Activity Actions

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

</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

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

</template>

</SnippetToggler>

---

## Retrieve Activity Action

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

</template>

</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

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

</template>

</SnippetToggler>

---

## Create a Comment

Creates a new comment on a given item.

### Request Body

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

</template>

</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

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

</template>

</SnippetToggler>

---

## Update a Comment

Updates an existing comment by activity action primary key.

### Request Body

`comment` **Required**\
The updated comment content. Supports Markdown.

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

</template>

</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

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

</template>

</SnippetToggler>

---

## Delete a Comment

Deletes a comment.

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

</template>

</SnippetToggler>

### Example

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

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

</template>

</SnippetToggler>
