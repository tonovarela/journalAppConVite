import { addDoc, collection, updateDoc,doc } from 'firebase/firestore';
import { FireBaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers';
import { saveNote, savingNewNote, setActiveNote, setNotes, setSaving, updatedNote } from './journalSlice';
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

export const startSaveNote =()=>{
	return async (dispatch,getState)=>{
		dispatch(setSaving());

		const { uid } = getState().auth;
		const { active:note } = getState().journal;
		const noteToFireStore = {...note};
		//delete noteToFireStore.id;		
		const noteRef = doc(FireBaseDB,`${uid}/journal/notes/${note.id}`)
		await updateDoc(noteRef,noteToFireStore);
		dispatch(updatedNote(noteToFireStore));			

	}
}

