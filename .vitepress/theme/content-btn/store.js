import { reactive } from 'vue';

export const types = reactive({});

export const btnTypes = [
	{
		btnType: 'api',
		label: 'The API',
		contentTypes: ['REST', 'GraphQL', 'SDK', 'CLI'],
		defaultType: 'REST',
		pref: '',
	},
	{
		btnType: 'stack',
		label: 'The Stack',
		contentTypes: ['JAM', 'MEAN', 'MERN', 'LAMP'],
		defaultType: 'JAM',
		pref: '',
	},
];
