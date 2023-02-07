import DefaultTheme from 'vitepress/theme';
import { createHead } from '@vueuse/head';
import SnippetToggler from './components/SnippetToggler.vue';
import { ref } from 'vue';
import MetaLayout from './MetaLayout.vue';

import './styles/vars.css';
import './styles/overrides.css';
import './styles/icons.css';

export default {
	...DefaultTheme,
	Layout: MetaLayout,
	enhanceApp(ctx) {
		DefaultTheme.enhanceApp(ctx);
		const head = createHead();
		ctx.app.use(head);
		ctx.app.component('SnippetToggler', SnippetToggler);
		ctx.app.config.globalProperties.pref = ref('REST');
	},
};
