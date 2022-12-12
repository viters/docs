<script lang="ts" setup>
defineProps<{
	choices: string[];
	modelValue: string | undefined;
	label?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const setPref = (event: Event) => emit('update:modelValue', (event?.target as HTMLSelectElement)?.value);
</script>

<template>
	<div class="snippet-toggler">
		<div class="snippet-toggler-header">
			<span class="snippet-toggler-header-label">{{ label }}</span>

			<span class="spacer" />

			<select class="snippet-toggler-header-lang" :value="modelValue" @input="setPref">
				<option v-for="choice in choices" :value="choice">
					{{ choice }}
				</option>
			</select>
			<svg
				class="snippet-toggler-header-lang-arrow"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 48 48"
				height="18"
				width="18"
			>
				<path d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z" />
			</svg>
		</div>

		<div>
			<template v-for="choice in choices">
				<div v-show="choice === modelValue">
					<slot :name="choice.toLowerCase()"></slot>
				</div>
			</template>
		</div>
	</div>
</template>

<style scoped>
.snippet-toggler {
	overflow: hidden;
	background: #f7f8ff;
}

.snippet-toggler-header {
	background-color: #25232d;
	color: #a6accd;
	height: 40px;
	display: flex;
	align-items: center;
	padding: 0 24px;
}

.spacer {
	flex-grow: 1;
}

.snippet-toggler-header-label {
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 600;
}

.snippet-toggler-header-lang {
	background-color: transparent;
	text-align: right;
	border: 0;
	padding: 0;
	padding-right: 18px;
	border: 0;
	border-color: transparent;
	font-family: inherit;
	color: inherit;
	appearance: none;
	-webkit-appearance: none;
	line-height: inherit;
	color: inherit;
	font-size: 12px;
}

.snippet-toggler-header-lang:focus {
	outline: none;
}

.snippet-toggler-header-lang-arrow {
	fill: #a6accd;
	position: absolute;
	right: 24px;
	user-select: none;
	pointer-events: none;
}

@media (min-width: 640px) {
	.snippet-toggler {
		border-radius: 8px;
	}
}
</style>
