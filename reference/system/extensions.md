---
description: REST and GraphQL API documentation on the Extensions collection in Directus.
readTime: 1 min read
pageClass: page-reference
---

<script setup>
import { ref } from 'vue';

import { SnippetToggler } from '@directus/vue-snippet-toggler';
import '@directus/vue-snippet-toggler/style.css';

const pref = ref('REST');
</script>

# Extensions

> The extensions endpoints are used by the Admin App to retrieve what extensions to install.
> [Learn more about Extensions](/getting-started/glossary#extensions).

---

## List Extensions

List the available extensions in the project. The types of extensions that you can list are interfaces, displays,
layouts, modules.

### Query Parameters

This endpoint doesn't currently support any query parameters.

### Returns

An array of interface extension keys.

### Syntax

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL', 'JS-SDK']"
	label="API" >

<template #rest>

```
GET /extensions/:type
```

</template>

<template #graphql>

```graphql
# POST /graphql/system

type Query {
	extensions: extensions
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
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
GET /extensions/interfaces
```

</template>
<template #graphql>

```graphql
query {
	extensions {
		interfaces
	}
}
```

</template>
<template #js-sdk>

```js
// The JS-SDK documentation for this feature is coming soon.
```

</template>

</SnippetToggler>
