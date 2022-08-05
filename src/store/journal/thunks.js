import { addDoc, collection, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { FireBaseDB } from '../../firebase/config';
import { fileUpload, loadNotes } from '../../helpers';
import { deleteNoteByID, saveNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updatedNote } from './journalSlice';
//import cloudinary from "cloudinary";
// cloudinary.config({
// 	secure:true,			
// 	cloud_name: process.env.REACT_APP_CLOUD_NAME,
// 	api_key: process.env.REACT_APP_API_KEY,
// 	api_secret: process.env.REACT_APP_API_SECRET
// });
export const startNewNote = () => {
	return async (dispatch, getState) => {
		dispatch(savingNewNote());
		const { uid } = getState().auth;
		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
			imagesUrls: []
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
		dispatch(updatedNote(note));
	};
};

export const startUploadingFiles = (files) => {
	return async (dispatch) => {
		dispatch(setSaving());
		const _files = Array.from(files);
		const fileUploadPromises = [];
		_files.forEach((f) => fileUploadPromises.push(fileUpload(f)));
		const photosUrl = await Promise.all(fileUploadPromises);
		dispatch(setPhotosToActiveNote(photosUrl));
		dispatch(saveNote());;

	};
};

export const startDeletingNote = () => {
	return async (dispatch, getState) => {

		const { uid } = getState().auth;
		const { active: note } = getState().journal;
		const docRef = doc(FireBaseDB, `${uid}/journal/notes/${note.id}`);
		await deleteDoc(docRef);
		dispatch(deleteNoteByID(note.id));
		
		//const resp = await cloudinary.v2.uploader.destroy("mbgcptbfxgegbu23cthf");
		//console.log(resp);

	}
}
