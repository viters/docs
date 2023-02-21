---
description: REST and GraphQL API documentation on the Fields collection in Directus.
readTime: 7 min read
pageClass: page-reference
---

<script setup>
import { useLocalStorage } from '@vueuse/core';
const pref = useLocalStorage('pref', 'REST');
</script>

# Fields

> Fields are individual pieces of content within an item. They are mapped to columns in the database.
> [Learn more about Fields](/getting-started/glossary#fields).

---

## The Field Object

`collection` **string**\
Name of the collection the field resides in.

`field` **string**\
The identifier of the field. This matches the table column name.

`type` **string**\
The Directus data type of the field. See [Types](/getting-started/glossary#types) for possible options.

#### Meta

Directus metadata, primarily used in the Admin App. Meta is optional.

`id` **integer**\
Primary key of the metadata row in `directus_fields`.

`collection` **string**\
The name of the collection this field resides in.

`field` **string**\
Identifier of the field. Matches the column name in the database.

`special` **string**\
Any special transform flags that apply to this field.

`interface` **string**\
The interface used for this field.

`options` **object**\
The interface options configured for this field. The structure is based on the interface used.

`display` **string**\
The display used for this field.

`display_options` **string**\
The configured options for the used display.

`readonly` **boolean**\
If the field is considered readonly in the Admin App.

`hidden` **boolean**\
If the field is hidden from the edit page in the Admin App.

`sort` **integer**\
Where this field is shown on the edit page in the Admin App.

`width` **string**\
How wide the interface is rendered on the edit page in the Admin App. One of `half`, `half-left`, `half-right`, `half-space`,
`full`, `fill`.

`translations` **array**\
How this field's name is displayed in the different languages in the Admin App.

`note` **string**\
Short description displayed in the Admin App.

#### Schema

"Raw" database information. Based on the database vendor used, different information might be returned. The following
are available for all drivers. Note: schema is optional. If a field exist in directus_fields, but not in the database,
it's an alias commonly used for relational (O2M) or presentation purposes in the Admin App.

`name` **string**\
Identifier of the field. Matches the column name in the database.

`table` **string**\
Name of the table the column resides in.

`data_type` **string**\
The datatype as used in the database. Note: this value is database vendor specific.

`default_value` **any**\
The configured default value for the column.

`max_length` **integer**\
Configured length for varchar type columns.

`numeric_precision` **integer**\
Precision for integer/float/decimal type fields.

`numeric_scale` **integer**\
Scale for integer/float/decimal type fields.

`is_nullable` **boolean**\
Whether or not the column is nullable. This is what is used as the "required" state in Directus.

`is_primaryKey` **boolean**\
Whether or not the field is the primary key of the table.

`foreign_key_column` **string**\
If the current column has a foreign key constraint, this points to the related column.

`foreign_key_table` **string**\
If the current column has a foreign key constraint, this points to the related table.

`comment` **string**\
Comment as stored in the database.

```json
{
	"collection": "articles",
	"field": "id",
	"type": "integer",
	"meta": {
		"id": 16,
		"collection": "articles",
		"field": "id",
		"special": null,
		"interface": "numeric",
		"options": null,
		"display": null,
		"display_options": null,
		"readonly": true,
		"hidden": true,
		"sort": 1,
		"width": "full",
		"translations": null,
		"note": "The unique identifier of the article"
	},
	"schema": {
		"name": "id",
		"table": "articles",
		"data_type": "integer",
		"default_value": null,
		"max_length": null,
		"numeric_precision": 32,
		"numeric_scale": 0,
		"is_nullable": false,
		"is_primaryKey": true,
		"has_auto_increment": true,
		"foreign_key_column": null,
		"foreign_key_table": null,
		"comment": null
	}
}
```

---

## List All Fields

List the available fields.

### Query Parameters

This endpoint doesn't currently support any query parameters.

### Returns

An array of [field objects](#the-field-object).

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
GET /fields
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	fields: [directus_fields]
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
GET /fields
```

</template>
<template #graphql>

```graphql
query {
	fields {
		collection
		field
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

## List Fields in Collection

List the available fields in a given collection.

### Query Parameters

This endpoint doesn't currently support any query parameters.

### Returns

An array of [field objects](#the-field-object).

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
GET /fields/:collection
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	fields_in_collection(collection: String!): directus_fields
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
GET /fields/articles
```

</template>
<template #graphql>

```graphql
query {
	fields_in_collection(collection: "articles") {
		collection
		field
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

## Get a Field

Get a single field in a given collection.

### Query Parameters

This endpoint doesn't currently support any query parameters.

### Returns

A [field object](#the-field-object).

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
GET /fields/:collection/:field
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	fields_by_name(collection: String!, field: String!): directus_fields
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
GET /fields/articles/title
```

</template>
<template #graphql>

```graphql
query {
	fields_by_name(collection: "articles", field: "title") {
		collection
		field
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

## Create a Field

Create a new field in the given collection.

### Query Parameters

This endpoint doesn't currently support any query parameters.

### Request

`field` **string**\
Required. Field key, also used as the column name.

`type` **string**\
Required. One of the Directus types. This in turn controls what datatype is used for the column in the database. Setting
the type to `alias` prevents a column from being created in the database.

`meta`\
Optional. Any of the optional meta values in the [field object](#the-field-object).

`schema`\
Optional. Any of the optional schema values in the [field object](#the-field-object).

### Returns

The [field object](#the-field-object) for the created field.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
POST /fields/:collection
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	create_fields_item(collection: String!, data: create_directus_fields_input!): directus_fields
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
// POST /fields/articles

{
	"field": "title",
	"type": "string",
	"meta": {
		"icon": "title"
	},
	"schema": {
		"default_value": "Hello World"
	}
}
```

</template>
<template #graphql>

```graphql
mutation {
	create_fields_item(
		collection: "articles"
		data: { field: "title", type: "string", meta: { icon: "title" }, schema: { default_value: "Hello World" } }
	) {
		collection
		field
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

## Update a Field

Updates the given field in the given collection.

### Query Parameters

This endpoint doesn't currently support any query parameters.

### Request

`type`\
The new type for the field.

::: warning Changing Type

Types may not be compatible, and/or data might be truncated / corrupted. Please be careful when changing types of an
existing field with content.

:::

`meta`\
Any of the optional meta values in the [field object](#the-field-object).

`schema`\
Any of the optional schema values in the [field object](#the-field-object).

Updating the field name is not supported at this time.

### Returns

The [field object](#the-field-object) for the updated field.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
PATCH /fields/:collection/:field
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	update_fields_item(collection: String!, field: String!, data: update_directus_fields_input!): directus_fields
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
// PATCH /fields/articles/title

{
	"meta": {
		"note": "Put the title here"
	},
	"schema": {
		"default_value": "Hello World!"
	}
}
```

</template>
<template #graphql>

```graphql
mutation {
	update_fields_item(
		collection: "articles"
		field: "title"
		data: { meta: { note: "Put the title here" }, schema: { default_value: "Hello World!" } }
	) {
		collection
		field
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

## Delete a Field

Deletes the given field in the given collection.

::: danger Destructive

Be aware, this will delete the column from the database, including all data in it. This action can't be undone.

:::

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
DELETE /fields/:collection/:field
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	delete_fields_item(collection: String!, field: String!): delete_field
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
DELETE /fields/articles/title
```

</template>
<template #graphql>

```graphql
mutation {
	delete_fields_item(collection: "articles", field: "title") {
		collection
		field
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
