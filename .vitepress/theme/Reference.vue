<script setup>
	import { types } from './store.js';

	const btnType = 'api';
	const toggleOptions = ['REST', 'GraphQL', 'SDK', 'CLI'];
	const defaultType = toggleOptions[0];

	function getPref() {
		let usrPref = localStorage.getItem('apiType');
		if (usrPref) {
			types.pref = usrPref
		} else {
			types.pref = defaultType;
		}
	}

	function setPref(apiPref) {
		localStorage.setItem('apiType', apiPref);
		types.pref = localStorage.getItem('apiType');
		// console.log(localStorage.getItem('apiType'));
	}

	getPref();
</script>

<template>
	<div class="api-button-container">
		<button v-for="t in toggleOptions" class="api-button" @click="setPref(t)"> {{t}} </button>
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


<!--
	TODO:
	Add a "name/label" to the btn?? "The API" or "Skill Level" (added below)
	DUse Obj name to assign btnType directly on the button in the  md file (e.g., :type="apiBtn")
	Combine the type list and the types.pref into a single object, see below.

	const apiBtn = {
		btnType: "api",
		btnLabel: "The API"
		toggleOptions: ["REST", "GraphQL",  "SDK", "CLI"],
		default: toggleOptions[0],
	}
-->
