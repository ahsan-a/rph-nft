import firebase from 'firebase-admin';
const serviceAccount = JSON.parse(process.env.FIREBASE || '{}');
let app: firebase.app.App;
let db: firebase.firestore.Firestore;

export const useDb = () => {
	if (!app) {
		app = firebase.initializeApp({
			credential: firebase.credential.cert(serviceAccount),
		});
		db = firebase.firestore();
	}

	return db;
};
