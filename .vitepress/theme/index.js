import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import { createHead } from '@vueuse/head';

import Layout from './DocLayout.vue';

import './vars.css';
import './overrides.css';
import './icons.css';

export default {
	...DefaultTheme,
	Layout,
	enhanceApp({ app }) {
		// DefaultTheme.enhanceApp(ctx);
		const head = createHead();
		app.use(head);
	},
};
