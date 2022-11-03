import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import { createHead } from '@vueuse/head';

import { SnippetToggler } from '@directus/vue-snippet-toggler';
import '@directus/vue-snippet-toggler/style.css';

import './vars.css';
import './overrides.css';
import './icons.css';

export default {
	...DefaultTheme,
	Layout,
	enhanceApp({ app }) {
		const head = createHead();
		app.use(head);

		app.component('SnippetToggler', SnippetToggler);
	},
};
