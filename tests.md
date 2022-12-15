<script setup>
import { ref } from 'vue';

import SnippetToggler from '../../.vitepress/theme/components/SnippetToggler.vue';

const pref = ref('REST');
</script>

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL']"
	label="API" >

<template #rest>

```
REST
```

</template>

<template #graphql>

```
GRAPHQL
```

</template>

</SnippetToggler>
