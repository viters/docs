<script setup>
	import { groups } from './store.js';
	import { useAttrs } from 'vue';

	function defineButtonType(group, groups) {
		for (let i of groups) {
			if (group == i.group) {
				// console.log("value of defineButtonType:", i);
				return i;
			}
		}
	}

	function getPref() { // passed-in groupDetails from file scope
		let userPref = localStorage.getItem(groupDetails.defaultType);
		groupDetails.pref.value = userPref ? userPref : groupDetails.defaultType;
		// console.log("getPref:", groupDetails.pref.value);
	}

	function setPref(newPref) {
		// console.log("setPref:", newPref);
		localStorage.setItem(group, newPref);
		groupDetails.pref.value = localStorage.getItem(group);
	}

	const group = useAttrs().group;
	const groupDetails = defineButtonType(group, groups); //  passed-in groupDetails from file scope
	getPref(groupDetails);
</script>

<template>
	<button v-for="choice in groupDetails.choices" class="api-button" @click="setPref(choice)"> {{choice}} </button>
	<div class="api-button-container">
	<div v-for="choice in groupDetails.choices" >
			<div v-show="choice == groupDetails.pref.value">
				<slot :name="choice"></slot>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.api-button-container {
		border: solid var(--vp-c-brand-darker);
		border-radius: 6px;
		padding: 2px;
	}

	.api-button {
		padding: 10px;
		border-radius: 6px;
		margin: 2px;
		background-color: var(--vp-c-brand-light);
	}

	.api-button:active {
		background-color: var(--vp-c-brand);
	}

</style>
