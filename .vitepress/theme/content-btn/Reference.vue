<script setup>
	import { groups } from './store.js';
	import { useAttrs } from 'vue';

	function defineButtonType(group, groups) {
		for (let i of groups) {
			if (group == i.group) {
				console.log("value of defineButtonType:", i);
				return i;
			}
		}
	}

	function getPref(btn) {
		console.log("getPref:", btn);
		// let usrPref = localStorage.getItem(btnType);
		// types[btnType] = usrPref ? usrPref : btn.defaultType;
	}

	function setPref(apiPref) {
		console.log("setPref:", apiPref);
		// localStorage.setItem(btnDetails.btnType, apiPref);
		// types[btnDetails.btnType] = localStorage.getItem(btnDetails.btnType);
	}

	const group = useAttrs().group;
	const groupDetails = defineButtonType(group, groups);
	getPref(groupDetails);

	const rest = {
		display: "none",
	}

</script>

<template>
	<div class="api-button-container">

		<button v-for="choice in groupDetails.choices" class="api-button" @click="setPref(choice)"> {{choice}} </button>

		<div v-for="choice in groupDetails.choices" >
			<slot :name="choice"></slot>
		</div>

	</div>
</template>

<style scoped>

	.inactive {
		display: none;
	}

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
		Convert <template> to a <Snippet>
		Add a CSS System
-->
