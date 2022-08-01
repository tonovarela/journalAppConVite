import { addDoc, collection } from 'firebase/firestore';
import { FireBaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers';
import { saveNote, savingNewNote, setActiveNote, setNotes } from './journalSlice';
export const startNewNote = () => {
	return async (dispatch, getState) => {
		dispatch(savingNewNote());
		const { uid } = getState().auth;
		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime()
		};
		const newDoc = await addDoc(collection(FireBaseDB, `${uid}/journal/notes`), newNote);
		newNote.id = newDoc.id;
		dispatch(saveNote());
		dispatch(setActiveNote(newNote));
	};
};

export const startLoadingNotes = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		if (!uid) throw new Error('El uid no existe');		
		const notes=await  loadNotes(uid);
		dispatch(setNotes(notes));
		
	};
};



