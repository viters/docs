<script setup>
import { ref } from 'vue'

function changeContent() {
	console.log();
}

const apiTypes = ['REST', 'GraphQL', 'SDK'];

</script>

<template>
	<div class="button-container">
		<button v-for="(apiType) in apiTypes" class="api-button" @click="changeContent">{{apiType}}</button>
	</div>
</template>

<style scoped>
.button-container {
	border: solid;
	border-radius: 8px;
}

.api-button {
		padding: 10px;
		margin: 5px;
		background-color: red;
	}
</style>
