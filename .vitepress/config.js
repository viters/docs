export default {
	base: '/',
	lang: 'en-US',
	title: 'Directus Docs',
	description: 'Directus. An Instant App & API for your SQL Database.',
	markdown: {
		theme: 'material-palenight',
		toc: {
			level: [2],
		},
	},
	head: [
		[
			'script',
			{
				type: 'text/javascript',
				async: true,
				defer: true,
				src: 'https://js-na1.hs-scripts.com/20534155.js',
			},
		],
		[
			'script',
			{
				type: 'text/javascript',
				async: true,
				defer: false,
				src: 'https://www.googletagmanager.com/gtag/js?id=UA-24637628-7',
			},
		],
		[
			'script',
			{},
			`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-24637628-7');
			`,
		],
		['link', { rel: 'shortcut icon', type: 'image/svg+xml', href: '/favicon.svg' }],
		[
			'link',
			{
				rel: 'apple-touch-icon',
				type: 'image/svg+xml',
				sizes: '180x180',
				href: '/favicon.svg',
			},
		],
		[
			'link',
			{
				rel: 'icon',
				type: 'image/svg+xml',
				sizes: '32x32',
				href: '/favicon.svg',
			},
		],
		[
			'link',
			{
				rel: 'icon',
				type: 'image/svg+xml',
				sizes: '16x16',
				href: '/favicon.svg',
			},
		],
		// google fonts
		[
			'link',
			{
				rel: 'preconnect',
				href: 'https://fonts.googleapis.com',
				crossorigin: 'crossorigin',
			},
		],
		[
			'link',
			{
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
				crossorigin: 'crossorigin',
			},
		],
		[
			'link',
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Material+Icons+Outlined',
			},
		],
		[
			'link',
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap',
			},
		],
	],
	lastUpdated: true,
	themeConfig: {
		siteTitle: false,
		logo: {
			light: '/logo-light.svg',
			dark: '/logo-dark.svg',
		},
		nav: [
			{ text: 'Website', link: 'https://directus.io/' },
			{ text: 'Cloud', link: 'https://directus.cloud/' },
			{ text: 'GitHub', link: 'https://github.com/directus/directus' },
		],
		algolia: {
			appId: 'T5BDNEU205',
			apiKey: '76eb519cf1a4492777a6991f75c5252b',
			indexName: 'directus',
		},
		sidebar: sidebar(),
		editLink: {
			pattern: 'https://github.com/directus/docs/edit/main/:path',
			text: 'Edit this page on GitHub',
		},
	},
};

function sidebar() {
	return [
		{
			text: 'Getting Started',
			items: [
				{
					text: 'Introduction',
					link: '/getting-started/introduction',
					// type: "page",
				},
				{
					text: 'Quickstart Guide',
					link: '/getting-started/quickstart',
					// type: "page",
				},
				{
					text: 'Architecture',
					link: '/getting-started/architecture',
					// type: "page",
				},
				{
					text: 'Help & Support',
					link: '/getting-started/support',
					// type: "page",
				},
				{
					text: 'Backing Directus',
					link: '/getting-started/backing-directus',
					// type: "page",
				},
				{
					text: 'Resources',
					link: '/getting-started/resources',
					// type: "page",
				},
				{
					text: 'Glossary',
					link: '/getting-started/glossary',
					// type: "page",
				},
			],
		},
		{
			text: 'App Guide',
			collapsible: true,
			collapsed: true,
			items: [
				{
					link: '/app/overview',
					text: 'Overview',
					// type: "page",
				},
				{
					link: '/app/content',
					// { type: "divider" },
					text: 'Content',
					type: 'page',
					items: [
						{
							link: '/app/content/collections',
							text: 'Collection Page',
							type: 'page',
						},
						{
							link: '/app/content/items',
							text: 'Item Page',
							// type: "page",
						},
						{
							link: '/app/content/shares',
							text: 'Shares',
							// type: "page",
						},
					],
				},
				{
					link: '/app/user-directory',
					text: 'User Directory',
					// type: "page",
				},
				{
					link: '/app/file-library',
					text: 'File Library',
					// type: "page",
				},
				{
					link: '/app/insights',
					text: 'Insights',
					// type: "page",
				},
				{
					link: '/app/documentation',
					text: 'Documentation',
					// type: "page",
				},
				{
					link: '/app/settings',
					text: 'Settings',
					// type: "page",
				},
				{
					link: '/app/display-templates',
					// { type: "divider" },
					text: 'Display Templates',
					// type: "page",
				},
				{
					link: '/app/filters',
					text: 'Filters',
					// type: "page",
				},
				{
					link: '/app/layouts',
					text: 'Layouts',
					// type: "page",
				},
				{
					link: '/app/import-export',
					text: 'Import / Export',
					// type: "page",
				},
			],
		},
		{
			text: 'Configuration',
			collapsible: true,
			collapsed: true,
			items: [
				// {
				// 	type: 'page',
				// 	link: '/configuration/overview',
				// 	title: 'Overview',
				// },
				{
					link: '/configuration/project-settings',
					text: 'Project Settings',
					// type: "page",
				},
				{
					link: '/configuration/data-model',
					text: 'Data Model',
					// type: "page",
					items: [
						{
							link: '/configuration/data-model/collections',
							text: 'Collections',
							// type: "page",
						},
						{
							link: '/configuration/data-model/fields',
							text: 'Fields',
							// type: "page",
						},
						{
							link: '/configuration/data-model/relationships',
							text: 'Relationships',
							// type: "page",
						},
					],
				},
				{
					link: '/configuration/users-roles-permissions',
					text: 'Users, Roles & Permissions',
					// type: "page",
				},
				{
					link: '/configuration/presets-bookmarks',
					text: 'Presets & Bookmarks',
					// type: "page",
				},
				{
					link: '/configuration/translation-strings',
					text: 'Translation Strings',
					// type: "page",
				},
				{
					link: '/configuration/webhooks',
					text: 'Webhooks',
					// type: "page",
				},
				{
					link: '/configuration/flows',
					text: 'Flows',
					// type: "page",
					collapsible: false,
					items: [
						{
							link: '/configuration/flows/triggers',
							text: 'Triggers',
							// type: "page",
						},
						{
							link: '/configuration/flows/operations',
							text: 'Operations',
							// type: "page",
						},
					],
				},
				{
					link: '/configuration/activity-log',
					text: 'Activity Log',
					// type: "page",
				},
				// {
				// 	link: '/configuration/security',
				// 	text: 'Security*',
				// 	type: 'page',
				// },
				// {
				// 	link: '/configuration/localization',
				// 	text: 'Localization*',
				// 	type: 'page',
				// },
				// {
				// 	link: '/configuration/faq',
				// 	text: 'Frequently Asked Questions*',
				// 	type: 'page',
				// },
			],
		},
		{
			text: 'API Reference',
			collapsible: true,
			collapsed: true,
			items: [
				{
					// type: 'page',
					link: '/reference/introduction',
					text: 'Introduction',
				},
				{
					// type: 'page',
					link: '/reference/authentication',
					text: 'Authentication',
				},
				{
					// type: 'page',
					link: '/reference/query',
					text: 'Global Parameters',
				},
				{
					// type: 'page',
					link: '/reference/filter-rules',
					text: 'Filter Rules',
				},
				{
					// type: 'page',
					link: '/reference/items',
					text: 'Items',
				},
				{
					// type: 'page',
					link: '/reference/files',
					text: 'Files',
				},
				{
					// type: 'page',
					link: '/reference/cli',
					text: 'CLI',
				},
				{
					// type: 'page',
					link: '/reference/sdk',
					text: 'JS-SDK',
				},
				{
					// type: 'page',
					link: '/reference/system/activity',
					text: 'Activity',
				},
				{
					// type: 'page',
					link: '/reference/system/collections',
					text: 'Collections',
				},
				{
					// type: 'page',
					link: '/reference/system/extensions',
					text: 'Extensions',
				},
				{
					// type: 'page',
					link: '/reference/system/fields',
					text: 'Fields',
				},
				{
					// type: 'page',
					link: '/reference/system/flows',
					text: 'Flows',
				},
				{
					// type: 'page',
					link: '/reference/system/folders',
					text: 'Folders',
				},
				{
					// type: 'page',
					link: '/reference/system/notifications',
					text: 'Notifications',
				},
				{
					// type: 'page',
					link: '/reference/system/operations',
					text: 'Operations',
				},
				{
					// type: 'page',
					link: '/reference/system/permissions',
					text: 'Permissions',
				},
				{
					// type: 'page',
					link: '/reference/system/presets',
					text: 'Presets',
				},
				{
					// type: 'page',
					link: '/reference/system/relations',
					text: 'Relations',
				},
				{
					// type: 'page',
					link: '/reference/system/revisions',
					text: 'Revisions',
				},
				{
					// type: 'page',
					link: '/reference/system/roles',
					text: 'Roles',
				},
				{
					// type: 'page',
					link: '/reference/system/server',
					text: 'Server',
				},
				{
					// type: 'page',
					link: '/reference/system/settings',
					text: 'Settings',
				},
				{
					// type: 'page',
					link: '/reference/system/users',
					text: 'Users',
				},
				{
					// type: 'page',
					link: '/reference/system/utilities',
					text: 'Utilities',
				},
				{
					// type: 'page',
					link: '/reference/system/webhooks',
					text: 'Webhooks',
				},
			],
		},
		{
			text: 'Extensions',
			collapsible: true,
			collapsed: true,
			items: [
				{
					// type: 'page',
					link: '/extensions/introduction',
					text: 'Introduction',
				},
				{
					// type: 'page',
					link: '/extensions/creating-extensions',
					text: 'Creating Extensions',
				},
				{
					// type: 'page',
					link: '/extensions/displays',
					text: 'Displays',
				},
				{
					// type: 'page',
					link: '/extensions/email-templates',
					text: 'Email Templates',
				},
				{
					// type: 'page',
					link: '/extensions/endpoints',
					text: 'Endpoints',
				},
				{
					// type: 'page',
					link: '/extensions/hooks',
					text: 'Hooks',
				},
				{
					// type: 'page',
					link: '/extensions/interfaces',
					text: 'Interfaces',
				},
				{
					// type: 'page',
					link: '/extensions/layouts',
					text: 'Layouts',
				},
				{
					// type: 'page',
					link: '/extensions/migrations',
					text: 'Migrations',
				},
				{
					// type: 'page',
					link: '/extensions/modules',
					text: 'Modules',
				},
				{
					// type: 'page',
					link: '/extensions/panels',
					text: 'Panels',
				},
				{
					// type: 'page',
					link: '/extensions/themes',
					text: 'Themes',
				},
			],
		},
		{
			text: 'Contributing',
			collapsible: true,
			collapsed: true,
			items: [
				{
					// type: 'page',
					link: '/contributing/introduction',
					text: 'Introduction',
				},
				{
					// type: 'page',
					link: '/contributing/codebase-overview',
					text: 'Codebase Overview',
				},
				{
					// type: 'page',
					link: '/contributing/running-locally',
					text: 'Running Locally',
				},
				{
					// type: 'page',
					link: '/contributing/github-ci',
					text: 'GitHub CI',
				},
				{
					// type: 'page',
					link: '/contributing/translations',
					text: 'Translating the App',
				},
			],
		},
		{
			text: 'Directus Cloud',
			collapsible: true,
			collapsed: true,
			items: [
				{
					// type: "page",
					link: '/cloud/overview',
					text: 'Overview',
				},
				{
					// type: "page",
					link: '/cloud/accounts',
					text: 'Accounts',
				},
				{
					// type: "page",
					link: '/cloud/teams',
					text: 'Teams',
				},
				{
					// type: "page",
					link: '/cloud/projects',
					text: 'Projects',
				},
				{
					// type: "page",
					link: '/cloud/glossary',
					text: 'Glossary',
				},
			],
		},
		{
			text: 'Self Hosted',
			collapsible: true,
			collapsed: true,
			items: [
				{
					// type: "page",
					link: '/self-hosted/quickstart',
					text: 'Quickstart',
				},
				{
					// type: "page",
					link: '/self-hosted/config-options',
					text: 'Config Options',
				},
				{
					// type: "page",
					link: '/self-hosted/sso',
					text: 'Single Sign-On (SSO)',
				},
				// {
				// 	type: 'page',
				// 	link: '/self-hosted/sso-examples',
				// 	text: 'SSO Examples',
				// },
				{
					// type: "page",
					link: '/self-hosted/installation',
					text: 'Installation',
					items: [
						{
							// type: "page",
							link: '/self-hosted/installation/aws',
							text: 'AWS',
						},
						{
							// type: "page",
							link: '/self-hosted/installation/cloudron',
							text: 'Cloudron',
						},
						{
							// type: "page",
							link: '/self-hosted/installation/cli',
							text: 'CLI',
						},
						{
							// type: "page",
							link: '/self-hosted/installation/digitalocean-app-platform',
							text: 'DigitalOcean',
						},
						{
							// type: "page",
							link: '/self-hosted/installation/docker',
							text: 'Docker',
						},
						{
							// type: "page",
							link: '/self-hosted/installation/gcp',
							text: 'Google Cloud Platform',
						},
						{
							// type: "page",
							link: '/self-hosted/installation/iis',
							text: 'IIS',
						},
						{
							// type: "page",
							link: '/self-hosted/installation/manual',
							text: 'Manual',
						},
						{
							// type: "page",
							link: '/self-hosted/installation/plesk',
							text: 'Plesk',
						},
						{
							// type: "page",
							link: '/self-hosted/installation/ubuntu',
							text: 'Ubuntu',
						},
					],
				},
				{
					type: 'page',
					link: '/self-hosted/upgrades-migrations',
					text: 'Upgrades & Migrations',
				},
			],
		},
	];
}
