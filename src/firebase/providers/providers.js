import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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
