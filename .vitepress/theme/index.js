import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import { createHead } from '@vueuse/head';

import SnippetToggler from '/components/SnippetToggler.vue';

import './vars.css';
import './overrides.css';
import './icons.css';

export default {
	...DefaultTheme,
	Layout,
	enhanceApp({ app }) {
		DefaultTheme.enhanceApp(ctx);
		// ctx.app.component('SnippetToggler', SnippetToggler);

		const head = createHead();
		app.use(head);
	},
};
