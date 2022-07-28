import {
	GoogleAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword
} from 'firebase/auth';
import { FireBaseAuth } from '../config';

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(FireBaseAuth, googleProvider);
		//const credentials = GoogleAuthProvider.credentialFromResult(result);
		const { uid, displayName, email, photoURL } = result.user;
		return {
			ok: true,
			displayName,
			email,
			photoURL,
			uid
		};
	} catch (error) {
		return {
			ok: false,
			errorCode: error.code,
			errorMessage: error.errorMessage
		};
	}
};

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
	try {
		const resp = await createUserWithEmailAndPassword(FireBaseAuth, email, password);
		const { uid, photoURL } = resp.user;
		await updateProfile(FireBaseAuth.currentUser, { displayName });
		return {
			ok: true,
			uid,
			photoURL,
			email
		};
	} catch (error) {
		return {
			ok: false,
			errorCode: error.code,
			errorMessage: error.errorMessage
		};
	}
};

export const loginWithEmailandPassword = async ({ email, password }) => {
	try {
		const result = await signInWithEmailAndPassword(FireBaseAuth, email, password);
		const { uid, displayName, photoURL } = result.user;
		return {
			ok: true,
			uid,
			displayName,
			email,
			photoURL
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			errorCode: error.code,
			errorMessage: error.errorMessage
		};
	}
};


export const logoutFirebase  =async()=>{
	return await FireBaseAuth.signOut();	

}