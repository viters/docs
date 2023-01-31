---
description: REST and GraphQL API documentation on the Settings collection in Directus.
readTime: 3 min read
pageClass: page-reference
---

<script setup>
import { ref } from 'vue';

import { SnippetToggler } from '@directus/vue-snippet-toggler';
import '@directus/vue-snippet-toggler/style.css';

const pref = ref('REST');
</script>

# Settings

> Settings are key-value pairs that are stored in the database, and control different aspects of the project. Only
> administrators have access to manage Settings.

---

## The Settings Object

`id` **uuid**\
Primary key of the setting.

`project_name` **string**\
Name of the project, shown in the Admin App.

`project_descriptor` **string**\
Descriptor of the project, shown in the Admin App.

`project_url` **string**\
Link to the (public) website that goes with this project.

`project_color` **string**\
Brand color for the current project.

`project_logo` **many-to-one**\
Primary logo for the current project. Many-to-one to [files](/reference/files).

`public_foreground` **many-to-one**\
Foreground image for the Admin App's public pages. Many-to-one to [files](/reference/files).

`public_background` **many-to-one**\
Background image for the Admin App's public pages. Many-to-one to [files](/reference/files).

`public_note` **string**\
Note shown on the Admin App's public pages. Supports Markdown.

`auth_login_attempts` **integer**\
How often a user is allowed to try to login. After which times the user will be suspended.

`auth_password_policy` **RegEx**\
What regex passwords must pass in order to be valid.

`storage_asset_transform` **string**\
If the transform endpoints are allowed to be used on [the assets endpoint](/reference/files#requesting-a-thumbnail). One
of `all`, `none` or `presets`.

`storage_asset_presets` **array**\
What preset keys exist in [the assets endpoint](/reference/files#requesting-a-thumbnail).

`custom_css` **string**\
CSS rules to override the App's default styling.

`storage_default_folder` **uuid**\
Folder for uploaded files. Does not affect existing files.

`basemaps` **array**\
Custom tiles to overriding the Mapbox defaults.

`mapbox_key` **string**\
[Mapbox Access Token](https://docs.mapbox.com/help/glossary/access-token).

`module_bar` **array**\
What modules are enabled/added globally.

`translation_strings` **array**\
The key and translations for Translation Strings.

`custom_aspect_ratios` **array**\
Custom aspect ratios in the [image editor](/app/file-library#edit-an-image).

```json
{
	"data": {
		"id": 1,
		"project_name": "Directus",
		"project_descriptor": "Application",
		"project_url": null,
		"project_color": null,
		"project_logo": null,
		"public_foreground": null,
		"public_background": null,
		"public_note": null,
		"auth_login_attempts": 25,
		"auth_password_policy": null,
		"storage_asset_transform": "all",
		"storage_asset_presets": [
			{
				"key": "small",
				"fit": "cover",
				"width": 200,
				"height": 161,
				"quality": 80,
				"withoutEnlargement": false
			}
		],
		"custom_css": null,
		"storage_default_folder": null,
		"basemaps": null,
		"mapbox_key": null,
		"module_bar": null,
		"translation_strings": [
			{
				"key": "draft",
				"translations": {
					"de-DE": "Entwurf",
					"en-US": "Draft"
				}
			}
		],
		"custom_aspect_ratios": [
			{
				"text": "16:10",
				"value": 1.6
			}
		]
	}
}
```

---

## Retrieve Settings

### Query Parameters

Supports all [global query parameters](/reference/query).

### Returns

Returns the [settings object](#the-settings-object).

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
			>

<template #rest>

```
GET /settings
```

</template>
<template #graphql>

```graphql
# POST /graphql/system

type Query {
	settings: directus_settings
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

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
GET /settings
```

</template>
<template #graphql>

```graphql
query {
	settings {
		project_name
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

## Update Settings

### Query Parameters

Supports all [global query parameters](/reference/query).

### Request

A partial [settings object](#the-settings-object).

### Returns

Returns the [settings object](#the-setting-object).

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API"
	>

<template #rest>

```
PATCH /settings
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Mutation {
	update_settings(data: update_directus_settings_input!): directus_settings
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

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```json
// PATCH /settings

{
	"project_url": "https://example.com/"
}
```

</template>
<template #graphql>

```graphql
mutation {
	update_settings(data: { project_url: "https://example.com" }) {
		project_name
		project_url
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
