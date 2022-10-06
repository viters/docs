import { reactive } from 'vue';

export const types = reactive({
	pref: 'REST',

	getPreference() {
		return localStorage.getItem('apiType');
	},

	setPreference(apiPref) {
		localStorage.setItem('apiType', apiPref);
		this.pref = localStorage.getItem('apiType');
		// console.log(localStorage.getItem('apiType'));
	},
});
