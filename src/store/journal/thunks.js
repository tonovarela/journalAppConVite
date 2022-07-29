import { doc,collection,setDoc } from 'firebase/firestore/lite';
import { FireBaseDB } from '../../firebase/config';
export const startNewNote = () => {
	return async (dispatch, getState) => {
		//uid
		const { uid } = getState().auth;

		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime()
		};
		console.log(uid);
		const newDoc = doc(collection(FireBaseDB,`${uid}/journal/notes`));
		//const resp= await setDoc(newDoc,newNote);
		//console.log(resp);
		console.log(newDoc);
				//dispathc New note
		//activeNote
	};
};
