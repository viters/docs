<script setup>
</script>

<template>
	<div class="header">
		<slot name="title"></slot>
		<slot name="tags"></slot>
		<slot name="skill"></slot>
		<slot name="version"></slot>
		<slot name="author"></slot>

	</div>
</template>

<style scoped>
 .header {
	padding: 2%;
	background-color: var(--vp-c-brand-lighter);
	border-style: solid;
	border-width: 2px;
	border-color: var(--vp-c-brand-light);
	border-radius: 10px;
 }
</style>
