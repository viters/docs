<script>
// use normal <script> to declare options
	export default {
		inheritAttrs: false
	}
</script>

<script setup>
import { useAttrs } from 'vue';
const choice = useAttrs().choice;

</script>

<template>
	<slot>Coming from Snippet.vue's default slot.</slot>
	<!--
	<template #wow>
		<p>This is from the inside of Snippet's template</p>
	</template>
	-->
</template>

<style scoped>
/* TBD */
</style>
