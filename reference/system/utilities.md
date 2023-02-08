---
description: REST and GraphQL API documentation on the Utilities collection in Directus.
readTime: 3 min read
pageClass: page-reference
---

<script setup>
import { useLocalStorage } from '@vueuse/core';
const pref = useLocalStorage('pref', 'REST');
</script>

# Utilities

> Utilities are the various helper endpoints located within the API.

---

## Generate a Random String

Gets a random string.

### Request

`length` **optional**

- **Type** — `Integer`
- **Description** — Sets length of the string generated.
- **Default** — Defaults to 32.

### Response

Returns a random string.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```

// Not currently available in REST

```

</template>
<template #graphql>

```graphql

# Not currently available in GraphQL

```

</template>
<template #js-sdk>

```js
await directus.utils.random.string();

// OR

await directus.utils.random.string(length);
```

</template>
</SnippetToggler>

### Example

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```

// Not currently available in REST

```

</template>
<template #graphql>

```graphql

# Not currently available in GraphQL

```

</template>
<template #js-sdk>

```js
await directus.utils.random.string();

// OR

await directus.utils.random.string(50);
```

</template>
</SnippetToggler>

## Generate a Hash from String

Generates a hash for a given string.

### Request

`string` **Required**\
String to hash.

### Returns

Hashed string.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
POST /utils/hash/generate
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	utils_hash_generate(string: String!): String
}
```

</template>

<template #js-sdk>

```js
await directus.utils.hash.generate(string_value);
```

</template>

</SnippetToggler>

### Example

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```json
// POST /utils/hash/generate

{
	"string": "Hello World!"
}
```

</template>
<template #graphql>

```graphql
mutation {
	utils_hash_generate(string: "Hello World!")
}
```

</template>
<template #js-sdk>

```js
await directus.utils.hash.generate('Hello World');
```

</template>

</SnippetToggler>

---

## Verify a Hash

Verify a string with a hash.

### Request

`string` **Required**\
Source string.

`hash` **Required**\
Hash you want to verify against.

### Returns

Boolean.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
POST /utils/hash/verify
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	utils_hash_verify(hash: String!, string: String!): Boolean
}
```

</template>
<template #js-sdk>

```js
await directus.utils.hash.verify(string, hash);
```

</template>

</SnippetToggler>

### Example

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```json
// POST /utils/hash/verify

{
	"string": "Hello World!",
	"hash": "$arg...fEfM"
}
```

</template>
<template #graphql>

```graphql
# POST /graphql/system

mutation {
	utils_hash_verify(hash: 'd41402abc4b2a76b9719d911017c592', string: 'hello')
}
```

</template>
<template #js-sdk>

```js
await directus.utils.hash.verify('My String', '$argon2i$v=19$m=4096,t=3,p=1$A5uogJh');
```

</template>
</SnippetToggler>

---

## Manually Sort Items in Collection

If a collection has a sort field, this util can be used to move items in that manual order.

### Request

`collection` **Required**

- **Type** - **String**
- **Description** - The name of the collection.

`item` **Required**

- **Type** — `String` or `Integer`
- **Description** — Primary key of the item you're moving in the collection.

`to` **Required**

- **Type** — `String` or `Integer`
- **Description** — Primary key of the item you're moving the source item too.

### Returns

Empty body.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
POST /utils/sort/:collection
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	utils_sort(collection: String!, item: ID!, to: ID!): Boolean
}
```

</template>
<template #js-sdk>

```js
// This will move "item"  to the position of "to"
// and move everything in between one position up

await directus.utils.sort(collection, item, to);
```

</template>

</SnippetToggler>

### Example

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```json
// POST /utils/sort/articles

{
	"item": 16,
	"to": 51
}
```

</template>
<template #graphql>

```graphql
mutation {
	utils_sort(collection: "articles", item: 16, to: 51)
}
```

</template>
<template #js-sdk>

```js
// This will move item `15` to the position of item `42`
// and move everything in between one "slot" up

await directus.utils.sort('articles', 15, 42);
```

</template>
</SnippetToggler>

---

## Import Data from File

Import multiple records from a JSON or CSV file into a collection. Relies on a `multipart/form-data` encoded request,
just like regular file uploads. Check [Upload a File](/reference/files#upload-a-file) for more information.

The import endpoint expects the file structure to match [the export query parameter](/reference/query#export). For JSON,
this is an array of objects, where every object is an item. For CSV, the first line has to be the columns header.

### Request

Send the file in a `multipart/form-data` request. See [Upload a File](/reference/files#upload-a-file) for more
information.

### Returns

Empty body.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
POST /utils/import/:collection
```

</template>

<template #graphql>

```graphql

# Not currently available in GraphQL

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
POST /utils/import/articles

Content-Type: multipart/form-data; charset=utf-8; boundary=__X_BOUNDARY__
Content-Length: 3442422

--__X_BOUNDARY__
Content-Disposition: form-data; name="file"; filename="articles.csv"
Content-Type: text/csv

"id","title","another","created_by"
1,"My First Articled","abc","506385A2-E444-4AE2-A860-F00957A62C8A"
2,"My Second Article","abc","506385A2-E444-4AE2-A860-F00957A62C8A"
3,"My Updated Third Article","abc","506385A2-E444-4AE2-A860-F00957A62C8A"
4,"My Fourth Article","abc","506385A2-E444-4AE2-A860-F00957A62C8A"
5,"My Fifth Article","abc","506385A2-E444-4AE2-A860-F00957A62C8A"
...
```

</template>
<template #graphql>

```graphql

# Not currently available in GraphQL

```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

---

## Export Data to a File

Export a larger data set to a file in the File Library

### Query Parameters

Doesn't use any query parameters.

### Request

`format` **Required**\
What file format to save the export to. One of `csv`, `json`, `xml`, `yaml`.

`query` **Required**\
The query object to use for the export. Supports the [global query parameters](/reference/query).

`file` **File Object**\
Partial file object to tweak where / how the export file is saved.

### Returns

Empty body

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
POST /utils/export/:collection
```

</template>

<template #graphql>

```graphql

# Not currently available in GraphQL

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
// POST /utils/export/articles

{
	"query": {
		"filter": {
			"status": {
				"_eq": "published"
			}
		}
	},
	"file": {
		"folder": "34e95c19-cc50-42f2-83c8-b97616ac2390"
	}
}
```

</template>
<template #graphql>

```graphql

# Not currently available in GraphQL

```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

---

## Clear the Internal Cache

Resets both the data and schema cache of Directus. This endpoint is only available to admin users.

### Request

n/a

### Returns

Empty body

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
POST /utils/cache/clear
```

</template>

<template #graphql>

```graphql
mutation {
	utils_cache_clear
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
POST /utils/cache/clear
```

</template>
<template #graphql>

```graphql
mutation {
	utils_cache_clear
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this is coming soon.
```

</template>
</SnippetToggler>

## Revert to a Previous Revision

Reverts to a previous revision.

:::tip

For more details, please see the documentation on [revisions](/reference/system/revisions.md).

:::

### Request

`primaryKey` **Required**

- **Type** — `Integer` or `String`
- **Description** — The key passed is the primary key of the revision you'd like to apply.

<!--
### Response

An Empty Body.
-->

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
// Not currently available in REST
```

</template>
<template #graphql>

```graphql
# Not currently available in GraphQL
```

</template>
<template #js-sdk>

```js
await directus.utils.revert(primaryKey);
```

</template>
</SnippetToggler>

### Example

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
// Not currently available in REST
```

</template>
<template #graphql>

```graphql
# Not currently available in GraphQL
```

</template>
<template #js-sdk>

```js
await directus.utils.revert(451);
```

</template>
</SnippetToggler>
