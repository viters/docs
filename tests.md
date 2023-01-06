<script setup>
import { ref } from 'vue';

import { SnippetToggler } from '@directus/vue-snippet-toggler';
import '@directus/vue-snippet-toggler/style.css';

const pref = ref('REST');
</script>

# Snippet

<SnippetToggler
	v-model="pref"
	:choices="['REST', 'GraphQL']"
	label="API"
	>

<template #rest> REST </template>

<template #graphql> GrapQL </template>

</SnippetToggler>
