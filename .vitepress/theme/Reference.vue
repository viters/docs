<script setup>
	import { types } from './store.js';
	import { useAttrs } from 'vue'


	const btnTypes = [
		{
			btnType: 'api',
			label: "The API",
			contentTypes: ['REST', 'GraphQL', 'SDK', 'CLI'],
			defaultType: 'REST',
			pref: types.pref,
		},
		{
			btnType: 'stack',
			label: "The Stack",
			contentTypes: ['JAM', 'MEAN', 'MERN', 'LAMP'],
			defaultType: 'JAM',
			pref: types.pref,
		},
	]

	function defineButtonType(theBtnType, theBtnTypeList) {
		console.log("inside DefineBtnType:", theBtnType);
		// console.log(theBtnType.btnType);
		for (let i of theBtnTypeList) {
			if (theBtnType == i.btnType) {
				return i;
			}
		}
	}

	function getPref(btn) {
		// console.log("btn's default type, in getpref scope:", btn.defaultType);
		let btnType = btn.btnType;
		let usrPref = localStorage.getItem(btnType);
		if (usrPref) {
			types[btnType] = usrPref;
		} else {
			types[btnType] = btn.defaultType;
		}
		console.log(types);
	}

	function setPref(apiPref) {
		localStorage.setItem(btnDetails.btnType, apiPref);
		// types.pref = localStorage.getItem(btnDetails.btnType);
		types[btnDetails.btnType] = localStorage.getItem(btnDetails.btnType);
		console.log("setting Pref:", btnDetails.btnType, types.pref, "DONE");
		// console.log(localStorage.getItem('apiType'));
	}

	const whatsThisBtn = useAttrs().btnType;
	const btnDetails = defineButtonType(whatsThisBtn, btnTypes);
	console.log("logging the assigned btn details:", btnDetails);
	getPref(btnDetails);

</script>

<script>
	export default {
		inheritAttrs: false
	}
</script>

<template>
	<div class="api-button-container">
		<button :theBtnType="$attrs.btnType" v-for="b in btnDetails.contentTypes" class="api-button" @click="setPref(b)"> {{b}} </button>
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
	Improve how fallthrough attribute is passed  -> from (:type="`api`") to (:type="api")
	Improve how slot elements pass vals to parent component -> from ( :v-if="types.pref.api == 'CLI'" ) to ( v-if="typeIs.CLI" ) || ( :typeIs.CLI )
	Consider refactoring logic: What to put in between Reference.vue and what to put in store.js?
	Add a CSS system
-->
