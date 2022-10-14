<script setup>
	import { types } from './store.js';
	import { useAttrs } from 'vue'

	const btnTypes = [
		{
			btnType: 'api',
			label: "The API",
			contentTypes: ['REST', 'GraphQL', 'SDK', 'CLI'],
			defaultType: 'REST',
		},
		{
			btnType: 'stack',
			label: "The Stack",
			contentTypes: ['JAM', 'MEAN', 'MERN', 'LAMP'],
			defaultType: 'JAM',
		},
	]

	function defineButtonType(theBtnType, theBtnTypeList) {
		for (let i of theBtnTypeList) {
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

	const whatsThisBtnType = useAttrs().btnType; // gets val passed to component (from :btnType) at instantiation. Lets us defines which btn data to use "on the fly".
	const btnDetails = defineButtonType(whatsThisBtnType, btnTypes); // gets the relevant button data. vals get used in getPref, setPref and template.
	getPref(btnDetails); // called here to render content on instantiation.

</script>

<script>
	export default {
		inheritAttrs: false
	}
</script>

<template>
	<div class="api-button-container">
		<button :theBtnType="$attrs.btnType" v-for="btn in btnDetails.contentTypes" class="api-button" @click="setPref(btn)"> {{btn}} </button>
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
	Improve how fallthrough attribute is passed  -> from (:btnType="`api`") to (:btnType="api")
	Improve how slot elements pass vals to parent component -> from ( :v-if="types.pref.api == 'CLI'" ) to ( v-if="typeIs.CLI" ) || ( :typeIs.CLI )
	Consider refactoring logic: What to put in between Reference.vue and what to put in store.js?
	Add a CSS system
-->
