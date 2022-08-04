import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { FireBaseDB } from '../../firebase/config';
import { fileUpload, loadNotes } from '../../helpers';
import { saveNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updatedNote } from './journalSlice';
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
		const notes = await loadNotes(uid);
		dispatch(setNotes(notes));
	};
};

export const startSaveNote = () => {
	return async (dispatch, getState) => {
		dispatch(setSaving());

		const { uid } = getState().auth;
		const { active: note } = getState().journal;
		const noteToFireStore = { ...note };
		//delete noteToFireStore.id;
		const noteRef = doc(FireBaseDB, `${uid}/journal/notes/${note.id}`);
		await updateDoc(noteRef, noteToFireStore);
		dispatch(updatedNote(noteToFireStore));
	};
};

export const startUploadingFiles = (files) => {
	return async (dispatch) => {
		dispatch(setSaving());
		const _files = Array.from(files);
		const fileUploadPromises =[];
		_files.forEach((f) => fileUploadPromises.push(fileUpload(f)));
		const photosUrl =await Promise.all(fileUploadPromises);
		dispatch(setPhotosToActiveNote(photosUrl));
		dispatch(saveNote());;

	};
};
