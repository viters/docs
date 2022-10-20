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
				},
				{
					text: 'Quickstart Guide',
					link: '/getting-started/quickstart',
				},
				{
					text: 'Architecture',
					link: '/getting-started/architecture',
				},
				{
					text: 'Help & Support',
					link: '/getting-started/support',
				},
				{
					text: 'Backing Directus',
					link: '/getting-started/backing-directus',
				},
				{
					text: 'Resources',
					link: '/getting-started/resources',
				},
				{
					text: 'Glossary',
					link: '/getting-started/glossary',
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
				},
				{
					link: '/app/content',
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
						},
						{
							link: '/app/content/shares',
							text: 'Shares',
						},
					],
				},
				{
					link: '/app/user-directory',
					text: 'User Directory',
				},
				{
					link: '/app/file-library',
					text: 'File Library',
				},
				{
					link: '/app/insights',
					text: 'Insights',
				},
				{
					link: '/app/documentation',
					text: 'Documentation',
				},
				{
					link: '/app/settings',
					text: 'Settings',
				},
				{
					link: '/app/display-templates',
					text: 'Display Templates',
				},
				{
					link: '/app/filters',
					text: 'Filters',
				},
				{
					link: '/app/layouts',
					text: 'Layouts',
				},
				{
					link: '/app/import-export',
					text: 'Import / Export',
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
				},
				{
					link: '/configuration/data-model',
					text: 'Data Model',
					items: [
						{
							link: '/configuration/data-model/collections',
							text: 'Collections',
						},
						{
							link: '/configuration/data-model/fields',
							text: 'Fields',
						},
						{
							link: '/configuration/data-model/relationships',
							text: 'Relationships',
						},
					],
				},
				{
					link: '/configuration/users-roles-permissions',
					text: 'Users, Roles & Permissions',
					items: [
						{
							link: '/configuration/users-roles-permissions/users',
							text: 'Users',
						},
						{
							link: '/configuration/users-roles-permissions/roles',
							text: 'Roles',
						},
						{
							link: '/configuration/users-roles-permissions/permissions',
							text: 'Permissions',
						},
						{
							link: '/configuration/users-roles-permissions/workflows',
							text: 'Workflows',
						},
					],
				},
				{
					link: '/configuration/presets-bookmarks',
					text: 'Presets & Bookmarks',
				},
				{
					link: '/configuration/translation-strings',
					text: 'Translation Strings',
				},
				{
					link: '/configuration/webhooks',
					text: 'Webhooks',
				},
				{
					link: '/configuration/flows',
					text: 'Flows',
					collapsible: false,
					items: [
						{
							link: '/configuration/flows/triggers',
							text: 'Triggers',
						},
						{
							link: '/configuration/flows/operations',
							text: 'Operations',
						},
					],
				},
				{
					link: '/configuration/activity-log',
					text: 'Activity Log',
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
					link: '/reference/introduction',
					text: 'Introduction',
				},
				{
					link: '/reference/authentication',
					text: 'Authentication',
				},
				{
					link: '/reference/query',
					text: 'Global Parameters',
				},
				{
					link: '/reference/filter-rules',
					text: 'Filter Rules',
				},
				{
					link: '/reference/items',
					text: 'Items',
				},
				{
					link: '/reference/files',
					text: 'Files',
				},
				{
					link: '/reference/cli',
					text: 'CLI',
				},
				{
					link: '/reference/sdk',
					text: 'JS-SDK',
				},
				{
					link: '/reference/system/activity',
					text: 'Activity',
				},
				{
					link: '/reference/system/collections',
					text: 'Collections',
				},
				{
					link: '/reference/system/extensions',
					text: 'Extensions',
				},
				{
					link: '/reference/system/fields',
					text: 'Fields',
				},
				{
					link: '/reference/system/flows',
					text: 'Flows',
				},
				{
					link: '/reference/system/folders',
					text: 'Folders',
				},
				{
					link: '/reference/system/notifications',
					text: 'Notifications',
				},
				{
					link: '/reference/system/operations',
					text: 'Operations',
				},
				{
					link: '/reference/system/permissions',
					text: 'Permissions',
				},
				{
					link: '/reference/system/presets',
					text: 'Presets',
				},
				{
					link: '/reference/system/relations',
					text: 'Relations',
				},
				{
					link: '/reference/system/revisions',
					text: 'Revisions',
				},
				{
					link: '/reference/system/roles',
					text: 'Roles',
				},
				{
					link: '/reference/system/server',
					text: 'Server',
				},
				{
					link: '/reference/system/settings',
					text: 'Settings',
				},
				{
					link: '/reference/system/users',
					text: 'Users',
				},
				{
					link: '/reference/system/utilities',
					text: 'Utilities',
				},
				{
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
					link: '/extensions/introduction',
					text: 'Introduction',
				},
				{
					link: '/extensions/creating-extensions',
					text: 'Creating Extensions',
				},
				{
					link: '/extensions/displays',
					text: 'Displays',
				},
				{
					link: '/extensions/email-templates',
					text: 'Email Templates',
				},
				{
					link: '/extensions/endpoints',
					text: 'Endpoints',
				},
				{
					link: '/extensions/hooks',
					text: 'Hooks',
				},
				{
					link: '/extensions/interfaces',
					text: 'Interfaces',
				},
				{
					link: '/extensions/layouts',
					text: 'Layouts',
				},
				{
					link: '/extensions/migrations',
					text: 'Migrations',
				},
				{
					link: '/extensions/modules',
					text: 'Modules',
				},
				{
					link: '/extensions/operations',
					text: 'Operations',
				},
				{
					link: '/extensions/panels',
					text: 'Panels',
				},
				{
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
					link: '/contributing/introduction',
					text: 'Introduction',
				},
				{
					link: '/contributing/codebase-overview',
					text: 'Codebase Overview',
				},
				{
					link: '/contributing/running-locally',
					text: 'Running Locally',
				},
				{
					link: '/contributing/github-ci',
					text: 'GitHub CI',
				},
				{
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
					link: '/cloud/overview',
					text: 'Overview',
				},
				{
					link: '/cloud/accounts',
					text: 'Accounts',
				},
				{
					link: '/cloud/teams',
					text: 'Teams',
				},
				{
					link: '/cloud/projects',
					text: 'Projects',
				},
				{
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
					link: '/self-hosted/quickstart',
					text: 'Quickstart',
				},
				{
					link: '/self-hosted/config-options',
					text: 'Config Options',
				},
				{
					link: '/self-hosted/sso',
					text: 'Single Sign-On (SSO)',
				},
				// {
				// 	type: 'page',
				// 	link: '/self-hosted/sso-examples',
				// 	text: 'SSO Examples',
				// },
				{
					link: '/self-hosted/installation',
					text: 'Installation',
					items: [
						{
							link: '/self-hosted/installation/aws',
							text: 'AWS',
						},
						{
							link: '/self-hosted/installation/cloudron',
							text: 'Cloudron',
						},
						{
							link: '/self-hosted/installation/cli',
							text: 'CLI',
						},
						{
							link: '/self-hosted/installation/digitalocean-app-platform',
							text: 'DigitalOcean',
						},
						{
							link: '/self-hosted/installation/docker',
							text: 'Docker',
						},
						{
							link: '/self-hosted/installation/gcp',
							text: 'Google Cloud Platform',
						},
						{
							link: '/self-hosted/installation/iis',
							text: 'IIS',
						},
						{
							link: '/self-hosted/installation/manual',
							text: 'Manual',
						},
						{
							link: '/self-hosted/installation/plesk',
							text: 'Plesk',
						},
						{
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
