import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import { createHead } from '@vueuse/head';

import './vars.css';
import './overrides.css';
import './icons.css';

import { SnippetToggler } from '../components/SnippetToggler.vue';

export default {
	...DefaultTheme,
	Layout,
	enhanceApp({ app }) {
		DefaultTheme.enhanceApp(ctx);
		ctx.app.component('SnippetToggler', SnippetToggler);

		const head = createHead();
		app.use(head);
	},
};
