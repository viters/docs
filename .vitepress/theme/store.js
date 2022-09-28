import { reactive, computed } from 'vue';

export const types = reactive({
	list: ['REST', 'GraphQL', 'SDK', 'CLI'],
	pref: 'REST',
	// Make set preference update the var in the getter.
	setPreference(apiPref) {
		console.log('setItem', apiPref);
		localStorage.setItem('apiType', apiPref);
		this.pref = localStorage.getItem('apiType');
	},
	// getPreference() {
	// 	console.log('got Item');
	// 	console.log(localStorage.getItem('apiType'));
	// 	return localStorage.getItem('apiType');
	// },
});
