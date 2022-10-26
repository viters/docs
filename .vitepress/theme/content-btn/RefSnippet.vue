<script setup>

import { useAttrs } from 'vue';

const choice = useAttrs().choice;
console.log("the choice:", choice);

</script>

<template>
	<div>
		<p>{{choice}}</p>
	</div>
</template>

<style scoped>
/* TBD */
</style>
