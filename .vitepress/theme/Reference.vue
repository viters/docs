<script setup>
// const x = {
// 	"key": "value"
// }
import json from './glossary.json';
const glossary = json;

</script>

# Test
<template>
	<div>
		<h1>{{glossary.key}}</h1>
	</div>
</template>
