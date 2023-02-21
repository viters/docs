---
description: REST and GraphQL API documentation on the Schema endpoint in Directus.
readTime: 5 min read
pageClass: page-reference
---

<script setup>
import { useLocalStorage } from '@vueuse/core';
const pref = useLocalStorage('pref', 'REST');
</script>

# Schema

> Retrieve and update the schema of an instance.

The procedure is as follows:

1. [`/schema/snapshot`](#retrieve-schema-snapshot): Receive the current snapshots of the schema of an instance
2. [`/schema/diff`](#retrieve-schema-difference): Compare the snapshot with the schema of another instance (e.g. fresh
   instance or instance in a different environment) and retrieve a `diff` containing all differences
3. [`/schema/apply`](#apply-schema-difference): Update the schema of another instance based on the previously obtained
   diff

---

## Retrieve Schema Snapshot

Retrieve the current schema. This endpoint is only available to admin users.

### Query Parameters

Supports the [export](/reference/query#export) query parameter.

### Returns

Returns the JSON object containing schema details by default, or downloads it in an alternative format when `export`
query parameter is used.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
GET /schema/snapshot
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
// returns JSON object
GET /schema/snapshot

// download as YAML file
GET /schema/snapshot?export=yaml
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

## Retrieve Schema Difference

Compare the current instance's schema against the schema snapshot in JSON request body and retrieve the difference. This
endpoint is only available to admin users.

Alternatively, upload a JSON or YAML schema file. Relies on a `multipart/form-data` encoded request like regular file
uploads. Check [Upload a File](/reference/files#upload-a-file) for more information.

::: warning Different versions and vendors

This endpoint does not allow different Directus versions and database vendors by default. This is to avoid any
unintentional diffs from being generated. You can opt in to bypass these checks by passing the `force` query parameter.

:::

### Query Parameters

`force` **boolean**\
Bypass version and database vendor restrictions.

### Request

JSON object containing [collections](/reference/system/collections#the-collection-object),
[fields](/reference/system/fields#the-field-object), and [relations](/reference/system/relations#the-relation-object) to
apply.

Alternatively, send a JSON or YAML schema file in a `multipart/form-data` request. See
[Upload a File](/reference/files#upload-a-file) for more information.

### Returns

Returns the differences between the current instance's schema and the schema passed in the request body.

:::details Toggle to see an example of a returned schema diff.

```json
{
	"hash": "2b3c71570228b864e16098147e5497f61b245a42",
	"diff": {
		"collections": [
			{
				"collection": "articles",
				"diff": [
					{
						"kind": "N",
						"rhs": {
							"collection": "articles",
							"meta": {
								"accountability": "all",
								"archive_app_filter": true,
								"archive_field": null,
								"archive_value": null,
								"collapse": "open",
								"collection": "articles",
								"color": null,
								"display_template": null,
								"group": null,
								"hidden": false,
								"icon": null,
								"item_duplication_fields": null,
								"note": null,
								"singleton": false,
								"sort": null,
								"sort_field": null,
								"translations": null,
								"unarchive_value": null
							},
							"schema": {
								"name": "articles"
							}
						}
					}
				]
			}
		],
		"fields": [
			{
				"collection": "articles",
				"field": "id",
				"diff": [
					{
						"kind": "N",
						"rhs": {
							"collection": "articles",
							"field": "id",
							"type": "integer",
							"meta": {
								"collection": "articles",
								"conditions": null,
								"display": null,
								"display_options": null,
								"field": "id",
								"group": null,
								"hidden": true,
								"interface": "input",
								"note": null,
								"options": null,
								"readonly": true,
								"required": false,
								"sort": null,
								"special": null,
								"translations": null,
								"validation": null,
								"validation_message": null,
								"width": "full"
							},
							"schema": {
								"name": "id",
								"table": "articles",
								"data_type": "integer",
								"default_value": null,
								"max_length": null,
								"numeric_precision": null,
								"numeric_scale": null,
								"is_nullable": false,
								"is_unique": false,
								"is_primaryKey": true,
								"is_generated": false,
								"generation_expression": null,
								"has_auto_increment": true,
								"foreign_key_table": null,
								"foreign_key_column": null
							}
						}
					}
				]
			},
			{
				"collection": "articles",
				"field": "title",
				"diff": [
					{
						"kind": "N",
						"rhs": {
							"collection": "articles",
							"field": "title",
							"type": "string",
							"meta": {
								"collection": "articles",
								"conditions": null,
								"display": null,
								"display_options": null,
								"field": "title",
								"group": null,
								"hidden": false,
								"interface": "input",
								"note": null,
								"options": null,
								"readonly": false,
								"required": false,
								"sort": null,
								"special": null,
								"translations": null,
								"validation": null,
								"validation_message": null,
								"width": "full"
							},
							"schema": {
								"name": "title",
								"table": "articles",
								"data_type": "varchar",
								"default_value": null,
								"max_length": 255,
								"numeric_precision": null,
								"numeric_scale": null,
								"is_nullable": true,
								"is_unique": false,
								"is_primaryKey": false,
								"is_generated": false,
								"generation_expression": null,
								"has_auto_increment": false,
								"foreign_key_table": null,
								"foreign_key_column": null
							}
						}
					}
				]
			}
		],
		"relations": []
	}
}
```

:::

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
POST /schema/diff

// Request body takes a schema diff as a JSON object
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
POST /schema/diff

Content-Type: multipart/form-data; charset=utf-8; boundary=__X_BOUNDARY__
Content-Length: 3442422

--__X_BOUNDARY__
Content-Disposition: form-data; name="file"; filename="schema.yaml"
Content-Type: text/yaml

version: 1
directus: 9.22.4
vendor: sqlite
collections:
  - collection: articles
    meta:
      accountability: all
      archive_app_filter: true
      archive_field: null
      archive_value: null
      collapse: open
      collection: articles
      color: null
      display_template: null
      group: null
      hidden: false
      icon: null
      item_duplication_fields: null
      note: null
      singleton: false
      sort: null
      sort_field: null
      translations: null
      unarchive_value: null
    schema:
      name: articles
fields:
  - collection: articles
    field: id
    type: integer
    meta:
      collection: articles
      conditions: null
      display: null
      display_options: null
      field: id
      group: null
      hidden: true
      interface: input
      note: null
      options: null
      readonly: true
      required: false
      sort: null
      special: null
      translations: null
      validation: null
      validation_message: null
      width: full
    schema:
      name: id
      table: articles
      data_type: integer
      default_value: null
      max_length: null
      numeric_precision: null
      numeric_scale: null
      is_nullable: false
      is_unique: false
      is_primaryKey: true
      is_generated: false
      generation_expression: null
      has_auto_increment: true
      foreign_key_table: null
      foreign_key_column: null
  - collection: articles
    field: title
    type: string
    meta:
      collection: articles
      conditions: null
      display: null
      display_options: null
      field: title
      group: null
      hidden: false
      interface: input
      note: null
      options: null
      readonly: false
      required: false
      sort: null
      special: null
      translations: null
      validation: null
      validation_message: null
      width: full
    schema:
      name: title
      table: articles
      data_type: varchar
      default_value: null
      max_length: 255
      numeric_precision: null
      numeric_scale: null
      is_nullable: true
      is_unique: false
      is_primaryKey: false
      is_generated: false
      generation_expression: null
      has_auto_increment: false
      foreign_key_table: null
      foreign_key_column: null
relations: []
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

## Apply Schema Difference

Update the instance's schema by passing the diff previously retrieved via `/schema/diff` endpoint in the request body.
This endpoint is only available to admin users.

### Query Parameters

This endpoint doesn't currently support any query parameters.

### Request Body

JSON object containing hash and diffs of [collections](/reference/system/collections#the-collection-object),
[fields](/reference/system/fields#the-field-object), and [relations](/reference/system/relations#the-relation-object) to
apply.

::: tip Hashes

The hash is based on the target instance's schema and version. It is used to safeguard against changes that may happen
after the current diff was generated which can potentially incur unexpected side effects when applying the diffs without
this safeguard. In case the schema has been changed in the meantime, the diff must be regenerated.

:::

### Returns

Empty body.

### Syntax

<SnippetToggler v-model="pref" :choices="['REST', 'GraphQL', 'JS-SDK']" label="API">
<template #rest>

```
POST /schema/apply

// Request body takes your returned schema diff
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
POST /schema/apply

{
  "hash": "2b3c71570228b864e16098147e5497f61b245a42",
  "diff": {
    "collections": [
      {
        "collection": "articles",
        "diff": [
          {
            "kind": "N",
            "rhs": {
              "collection": "articles",
              "meta": {
                "accountability": "all",
                "archive_app_filter": true,
                "archive_field": null,
                "archive_value": null,
                "collapse": "open",
                "collection": "articles",
                "color": null,
                "display_template": null,
                "group": null,
                "hidden": false,
                "icon": null,
                "item_duplication_fields": null,
                "note": null,
                "singleton": false,
                "sort": null,
                "sort_field": null,
                "translations": null,
                "unarchive_value": null
              },
              "schema": {
                "name": "articles"
              }
            }
          }
        ]
      }
    ],
    "fields": [
      {
        "collection": "articles",
        "field": "id",
        "diff": [
          {
            "kind": "N",
            "rhs": {
              "collection": "articles",
              "field": "id",
              "type": "integer",
              "meta": {
                "collection": "articles",
                "conditions": null,
                "display": null,
                "display_options": null,
                "field": "id",
                "group": null,
                "hidden": true,
                "interface": "input",
                "note": null,
                "options": null,
                "readonly": true,
                "required": false,
                "sort": null,
                "special": null,
                "translations": null,
                "validation": null,
                "validation_message": null,
                "width": "full"
              },
              "schema": {
                "name": "id",
                "table": "articles",
                "data_type": "integer",
                "default_value": null,
                "max_length": null,
                "numeric_precision": null,
                "numeric_scale": null,
                "is_nullable": false,
                "is_unique": false,
                "is_primaryKey": true,
                "is_generated": false,
                "generation_expression": null,
                "has_auto_increment": true,
                "foreign_key_table": null,
                "foreign_key_column": null
              }
            }
          }
        ]
      },
      {
        "collection": "articles",
        "field": "title",
        "diff": [
          {
            "kind": "N",
            "rhs": {
              "collection": "articles",
              "field": "title",
              "type": "string",
              "meta": {
                "collection": "articles",
                "conditions": null,
                "display": null,
                "display_options": null,
                "field": "title",
                "group": null,
                "hidden": false,
                "interface": "input",
                "note": null,
                "options": null,
                "readonly": false,
                "required": false,
                "sort": null,
                "special": null,
                "translations": null,
                "validation": null,
                "validation_message": null,
                "width": "full"
              },
              "schema": {
                "name": "title",
                "table": "articles",
                "data_type": "varchar",
                "default_value": null,
                "max_length": 255,
                "numeric_precision": null,
                "numeric_scale": null,
                "is_nullable": true,
                "is_unique": false,
                "is_primaryKey": false,
                "is_generated": false,
                "generation_expression": null,
                "has_auto_increment": false,
                "foreign_key_table": null,
                "foreign_key_column": null
              }
            }
          }
        ]
      }
    ],
    "relations": []
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
