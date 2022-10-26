import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import Reference from './content-btn/Reference.vue';
import RefSnippet from './content-btn/RefSnippet.vue';
import { createHead } from '@vueuse/head';

import './vars.css';
import './overrides.css';
import './icons.css';

export default {
	...DefaultTheme,
	Layout,
	enhanceApp({ app }) {
		app.component('Reference', Reference);
		app.component('RefSnippet', RefSnippet);
		const head = createHead();
		app.use(head);
	},
};
