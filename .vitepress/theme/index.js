import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import Reference from './Reference.vue';
import { createHead } from '@vueuse/head';

import './vars.css';
import './overrides.css';
import './icons.css';

export default {
	...DefaultTheme,
	Layout,
	enhanceApp({ app }) {
		app.component('Reference', Reference);
		const head = createHead();
		app.use(head);
	},
};
