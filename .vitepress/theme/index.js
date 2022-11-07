import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import { createHead } from '@vueuse/head';
import HeaderBlock from '../header/HeaderBlock.vue';

import './vars.css';
import './overrides.css';
import './icons.css';

export default {
	...DefaultTheme,
	Layout,
	enhanceApp({ app }) {
		// DefaultTheme.enhanceApp(ctx);
		app.component('HeaderBlock', HeaderBlock);
		const head = createHead();
		app.use(head);
	},
};
