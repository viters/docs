<script setup>
	import { types, btnTypes } from './store.js';
	import { useAttrs } from 'vue'

	function defineButtonType(theBtnType, btnTypeList) {
		for (let i of btnTypeList) {
			if (theBtnType == i.btnType) {
				return i;
			}
		}
	}

	function getPref(btn) {
		let btnType = btn.btnType;
		let usrPref = localStorage.getItem(btnType);
		types[btnType] = usrPref ? usrPref : btn.defaultType;
	}

	function setPref(apiPref) {
		localStorage.setItem(btnDetails.btnType, apiPref); // Set pref in localStorage, to save for future use.
		types[btnDetails.btnType] = localStorage.getItem(btnDetails.btnType); // Sets pref in store.js, to reactively update all btns
	}

	const btnGroup = useAttrs().group; // gets val passed to component (from :btnType) at instantiation. Lets us defines which btn data to use "on the fly".
	const btnDetails = defineButtonType(btnGroup, btnTypes); // gets the relevant button data. vals get used in getPref, setPref and template.
	getPref(btnDetails); // called here to render content on instantiation.

</script>

<script>
	export default {
		inheritAttrs: false
	}
</script>

<template>
	<div class="api-button-container">
		<button :theBtnType="$attrs.group" v-for="choice in btnDetails.choices" class="api-button" @click="setPref(choice)"> {{choice}} </button>
		<slot :pref="types"></slot>
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
	Improve how slot elements pass vals to parent component -> from ( :v-if="types.pref.api == 'CLI'" ) to ( v-if="typeIs.CLI" ) || ( :typeIs=CLI )
	Consider refactoring logic: What to put in between Reference.vue and what to put in store.js?
	Add a CSS system
-->
