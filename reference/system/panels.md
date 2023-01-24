---
description: REST and GraphQL API documentation on the Panels collection in Directus.
readTime: 5 min read
pageClass: page-reference
---

<script setup>
import { ref } from 'vue';

import { SnippetToggler } from '@directus/vue-snippet-toggler';
import '@directus/vue-snippet-toggler/style.css';

const pref = ref('REST');
</script>

# Panels

> Panels are modular units of data visualization that exist within the Insights module. Each panel exists within a
> Dashboard and can be positioned and resized as needed.

[Learn more about Panels](/app/insights).

---

## The Panel Object

`id` **uuid**\
Primary key of the panel.

`dashboard` **many-to-one**\
Dashboard where this panel is visible. Many-to-one to [dashboards](/reference/system/dashboards).

`name` **string**\
Name of the panel.

`icon` **string**\
Material design icon for the panel.

`color` **string**\
Accent color of the panel.

`show_header` **boolean**\
Whether or not the header should be rendered for this panel.

`note` **string**\
Description for the panel.

`type` **string**\
The panel type used for this panel.

`position_x` **integer**\
The X position on the workspace grid.

`position_y` **integer**\
The Y position on the workspace grid.

`width` **integer**\
Width of the panel in number of workspace dots.

`height` **integer**\
Height of the panel in number of workspace dots.

`options` **JSON**\
Arbitrary options for the panel. Differs per panel type.

`date_created` **Date**\
When the panel was created

`user_created` **many-to-one**\
User that created the panel. Many-to-one to [users](/reference/system/users).

```json
{
	"id": "22640672-eef0-4ee9-ab04-591f3afb2883",
	"dashboard": "a79bd1b2-beb2-49fc-8a26-0b3eec0e2697",
	"name": "30-day sales",
	"icon": "paid",
	"color": "#6B8068",
	"show_header": true,
	"note": "Overview of the sales numbers in the last 30 days",
	"type": "time-series",
	"position_x": 1,
	"position_y": 1,
	"width": 8,
	"height": 6,
	"options": {},
	"date_created": "2023-01-05T19:05:51.884Z",
	"user_created": "fd066644-c8e5-499d-947b-fe6c6e1a1473"
}
```

---

## List Panels

List all panels that exist in Directus.

If using REST, learn more about using [SEARCH](/reference/introduction#search-http-method)

### Query Parameters

Supports all [global query parameters](/reference/query).

### Returns

An array of up to [limit](/reference/query#limit) [panel objects](#the-panel-object). If no items are available, data
will be an empty array.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
GET /panels
SEARCH /panels
```

</template>
<template #graphql>

```graphql
# POST /graphql/system

type Query {
	panels: [directus_panels]
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
GET /panels
SEARCH /panels
```

</template>
<template #graphql>

```graphql
query {
	panels {
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

## Retrieve a Panel

List an existing panel by primary key.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Returns

Returns the requested [panel object](#the-panel-object).

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
GET /panels/:id
```

</template>
<template #graphql>

```graphql
# POST /graphql/system

type Query {
	panels_by_id(id: ID!): directus_panels
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
GET /panels/2fc325fb-299b-4d20-a9e7-a34349dee8b2
```

</template>
<template #graphql>

```graphql
query {
	panels_by_id(id: "2fc325fb-299b-4d20-a9e7-a34349dee8b2") {
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

## Create a Panel

Create a new panel.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request Body

A partial [panel object](#the-panel-object).

### Returns

Returns the [panel object](#the-panel-object) for the created panel.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
POST /panels
```

</template>
<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	create_panels_item(data: create_directus_panels_input!): directus_panels
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
// POST /panels

{
	"name": "My Panel",
	"icon": "architecture"
}
```

</template>
<template #graphql>

```graphql
mutation {
	create_panels_item(data: { name: "My Panel", icon: "panels" }) {
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

## Create Multiple Panels

Create multiple new panels.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request Body

An array of partial [panel objects](#the-panel-object).

### Returns

Returns the [panel object](#the-panel-object) for the created panel.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
POST /panels
```

</template>
<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	create_panels_items(data: [create_directus_panels_input!]!): [directus_panels]
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
// POST /panels

[
	{
		"name": "My Panel",
		"icon": "architecture"
	},
	{
		"name": "Another Panel",
		"icon": "person"
	}
]
```

</template>
<template #graphql>

```graphql
mutation {
	create_panels_items(
		data: [
			{
				"name": "My Panel",
				"icon": "architecture"
			},
			{
				"name": "Another Panel",
				"icon": "person"
			}
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

## Update a Panel

Update an existing panel.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request Body

A partial [panel object](#the-panel-object).

### Returns

Returns the [panel object](#the-panel-object) for the updated panel.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
PATCH /panels/:id
```

</template>
<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	update_panels_item(id: ID!, data: update_directus_panels_input): directus_panels
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
// PATCH /panels/2fc325fb-299b-4d20-a9e7-a34349dee8b2

{
	"name": "My Updated Panel"
}
```

</template>
<template #graphql>

```graphql
mutation {
	update_panels_item(id: "2fc325fb-299b-4d20-a9e7-a34349dee8b2", data: { name: "My Updated Panel" }) {
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

## Update Multiple Panels

Update multiple existing panels.

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request Body

`keys` **Required**\
Array of primary keys of the panels you'd like to update.

`data` **Required**\
Any of [the panel](#the-panel-object)'s properties.

### Returns

Returns the [panel objects](#the-panel-object) for the updated panels.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
PATCH /panels
```

</template>
<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	update_panels_items(ids: [ID!]!, data: update_directus_panels_input): [directus_panels]
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
// PATCH /panels

{
	"keys": ["3f2facab-7f05-4ee8-a7a3-d8b9c634a1fc", "7259bfa8-3786-45c6-8c08-cc688e7ba229"],
	"data": {
		"color": "#6644FF"
	}
}
```

</template>
<template #graphql>

```graphql
mutation {
	update_panels_items(
		ids: [
			"3f2facab-7f05-4ee8-a7a3-d8b9c634a1fc",
			"7259bfa8-3786-45c6-8c08-cc688e7ba229"
			]
		data: { "color": "#6644FF" }
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

## Delete a Panel

Delete an existing panel.

### Returns

Empty body.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
DELETE /panels/:id
```

</template>
<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	delete_panels_item(id: ID!): delete_one
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
DELETE /panels/12204ee2-2c82-4d9a-b044-2f4842a11dba
```

</template>
<template #graphql>

```graphql
mutation {
	delete_panels_item(id: "12204ee2-2c82-4d9a-b044-2f4842a11dba") {
		id
	}
}
```

</template>
<template #js-sdk>

</template>
</SnippetToggler>

---

## Delete Multiple Panels

Delete multiple existing panels.

### Request Body

An array of panels primary keys

### Returns

Empty body.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
DELETE /panels
```

</template>
<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	delete_panels_items(ids: [ID!]!): delete_many
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
// DELETE /panels
["25821236-8c2a-4f89-8fdc-c7d01f35877d", "02b9486e-4273-4fd5-b94b-e18fd923d1ed", "7d62f1e9-a83f-407b-84f8-1c184f014501"]
```

</template>
<template #graphql>

```graphql
mutation {
	delete_panels_items(
		ids: [
			"25821236-8c2a-4f89-8fdc-c7d01f35877d"
			"02b9486e-4273-4fd5-b94b-e18fd923d1ed"
			"7d62f1e9-a83f-407b-84f8-1c184f014501"
		]
	) {
		ids
	}
}
```

</template>
<template #js-sdk>

</template>
</SnippetToggler>
