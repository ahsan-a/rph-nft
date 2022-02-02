import { defineStore } from 'pinia';
import { User } from '~/typings';

interface State {
	loggedIn: boolean;
	user: User | null;
}
export const useMainStore = defineStore('main', {
	state: (): State => {
		return {
			loggedIn: false,
			user: null,
		};
	},
});
