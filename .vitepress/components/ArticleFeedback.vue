<script setup lang="ts">
import { defineProps, ref, reactive } from 'vue';
const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
});

const loading = ref(false);
const error = ref(null);
const success = ref(false);

const feedback = reactive({
	id: null,
	rating: null,
	comments: null,
});

const prompts = [
	'Make it count',
	'Leave some feedback',
	'Help us improve',
	`We're all ears 🐰`,
	'Tell us what is missing',
	'Your thoughts matter to us',
	'Feedback is a gift',
	'What do you think?',
];

function getPrompt() {
	return prompts[Math.floor(Math.random() * prompts.length)];
}

const ratingOptions = [
	{ label: 'Worst Doc Ever 🗑️', value: 1, message: 'Woof! 🤦‍♂️ Sorry about that. How do we fix it?' },
	{ label: 'Not Helpful 😡', value: 2, message: '🧐 Help us do better. How can we improve this article?' },
	{ label: 'Helpful 😃', value: 3, message: 'Nice! 👍  Anything we can improve upon?' },
	{
		label: 'Super Helpful 🤩',
		value: 4,
		message: `Awesome! The whole team is rejoicing in celebration! 🥳🎉🎊 Anything you'd like to say to them?`,
	},
];

const baseUrl = 'https://bryantdemo.directus.app/items/docs_feedback';

const headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
};

async function createSubmission() {
	loading.value = true;
	const body = {
		rating: feedback.rating,
		comments: feedback.comments,
		title: props.title,
		url: props.url,
	};
	try {
		const response = await fetch(baseUrl, {
			method: 'POST',
			body: JSON.stringify(body),
			headers,
		});
		const { data } = await response.json();
		feedback.id = data.id;
	} catch (error) {
		error.value = error;
		console.error(error);
	} finally {
		loading.value = false;
	}
}

async function updateSubmission() {
	loading.value = true;
	const body = {
		rating: feedback.rating,
		comments: feedback.comments,
	};
	try {
		const response = await fetch(`${baseUrl}/${feedback.id}`, {
			method: 'PATCH',
			body: JSON.stringify(body),
			headers,
		});
		const data = await response.json();
		if (body.comments) {
			success.value = true;
		}
	} catch (error) {
		error.value = error;
		console.error(error);
	} finally {
		loading.value = false;
	}
}

function handler() {
	if (feedback.id) {
		updateSubmission();
	} else {
		createSubmission();
	}
}
</script>
<template>
	<div class="wrapper">
		<Transition name="fade" mode="out-in">
			<div v-if="!feedback.rating" class="step">
				<div>
					<div>
						<p class="desc">{{ getPrompt() }}</p>
						<p class="heading">How helpful was this article?</p>
					</div>
				</div>
				<div class="button-container">
					<button
						class="btn"
						v-for="item in ratingOptions"
						:key="item.value"
						@click="
							feedback.rating = item.value;
							handler();
						"
					>
						<span>{{ item.label }}</span>
					</button>
				</div>
			</div>
			<div v-else-if="feedback.rating && !success" class="step">
				<div>
					<p class="desc">This article is</p>
					<div>
						<span>{{ ratingOptions[feedback.rating - 1].label }}</span>
						<button style="margin-left: 0.5rem" class="btn" @click="feedback.rating = null">
							<span mi icon>close</span>
						</button>
					</div>
				</div>
				<p class="heading">{{ ratingOptions[feedback.rating - 1].message }}</p>
				<textarea v-model="feedback.comments" autofocus class="input" />
				<button class="btn btn-primary" @click="handler()" :disabled="!feedback.comments">Send Us Your Feedback</button>
			</div>
			<div v-else class="step">
				<p class="heading">Thanks for your feedback!</p>
			</div>
		</Transition>
	</div>
</template>

<style scoped>
.step > * + * {
	margin-top: 1rem;
}
.btn {
	border: 1px solid var(--vp-c-divider);
	border-radius: 8px;
	transition: border-color 0.25s, background-color 0.25s;
	display: inline-block;
	font-size: 16px;
	font-weight: 500;
	line-height: 1.5;
	margin: 0;
	padding: 0.375rem 0.75rem;
	text-align: center;
	vertical-align: middle;
	white-space: nowrap;
}
.btn:disabled {
	opacity: 0.5;
}
.btn:hover {
	border-color: var(--vp-c-brand);
}

.btn-primary {
	color: #fff;
	background-color: var(--vp-c-brand);
	border-color: var(--vp-c-brand);
}

.btn-primary:hover {
	background-color: var(--vp-c-brand-darker);
	border-color: var(--vp-c-brand-darker);
}

.heading {
	font-size: 1.2rem;
	font-weight: 700;
}

.button-container {
	display: grid;
	grid-gap: 0.5rem;
}

.wrapper {
	margin: 2rem 0;
	padding: 1.5rem;
	border: 2px dashed var(--vp-custom-block-tip-border);
	border-radius: 8px;
}

.input {
	width: 100%;
	height: 100px;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 0.375rem 0.75rem;
}

.desc {
	display: block;
	line-height: 20px;
	font-size: 12px;
	font-weight: 500;
	color: var(--vp-c-text-2);
}

@media screen and (min-width: 768px) {
	.button-container {
		grid-template-columns: repeat(4, 1fr);
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
