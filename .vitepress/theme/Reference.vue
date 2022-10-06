<script setup>
	import { types } from './store.js';

	const apiTypes = ['REST', 'GraphQL', 'SDK', 'CLI'];

	function changeContent(apiPref) {
		types.setPreference(apiPref);
		// console.log("types.pref:", types.pref);
	}
</script>

<template>
	<div class="api-button-container">
		<button v-for="t in apiTypes" class="api-button" @click="changeContent(t)"> {{t}} </button>
		<slot :pref="types.pref"></slot>
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
