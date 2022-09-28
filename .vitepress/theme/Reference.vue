<script setup>

import { ref } from 'vue'
import { types } from './store.js';
// const apiTypes = ['REST', 'GraphQL', 'SDK', 'CLI'];

function changeContent(apiPref) {
	types.setPreference(apiPref);
	// console.log(apiType);
	// console.log(types)
}

</script>

<template>
	<div class="api-button-container">
			<button v-for="type in types.list" class="api-button" @click="changeContent(type)">{{type}}</button>
	</div>
</template>

<style scoped>
.api-button-container {
	border: solid;
	border-radius: 8px;
}

.api-button {
		padding: 10px;
		margin: 5px;
		background-color: red;
	}
</style>
