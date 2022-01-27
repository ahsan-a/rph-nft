import { defineStore } from 'pinia';

interface State {
	loggedIn: boolean;
	user: any;
}
export const useMainStore = defineStore('main', {
	state: (): State => {
		return {
			loggedIn: false,
			user: null,
		};
	},
});
