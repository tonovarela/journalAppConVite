import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
	name: 'journal',
	initialState: {
		isSaving: false,
		MessageSaved: '',
		notes: [],
		active: null
		//   active:{
		//     id:'ABC123',
		//     title:'sdfdsfds',
		//     body:'',
		//     date:123445,
		//     imagesUrls:[]  //foto1,foto2,foto3
		//   }
	},
	reducers: {
		savingNewNote: (state, action) => {
			state.isSaving = true;
		},
		addNewEmptyNote: (state, action) => {
			state.notes.push(action.payload);
			state.isSaving = false;
		},
		setActiveNote: (state, action) => {
			state.active = action.payload;
			state.MessageSaved="";
		},
		setNotes: (state, action) => {
			state.notes = action.payload;
		},
		setSaving: (state) => {
			state.isSaving=true;
			state.MessageSaved="";

		},
		updatedNote:(state,action)=>{
          state.isSaving=false;
		  state.notes = state.notes.map(n=> {
			if (n.id === action.payload.id){
				return action.payload;
			}
			return n;
		  });
		  state.MessageSaved = `${action.payload.title}, actualizada correctamente`;

		},
		saveNote: (state, action) => {
			state.isSaving = false;
		},
		deleteNoteByID: (state, action) => {}
	}
});
export const {
	addNewEmptyNote,
	deleteNoteByID,
	saveNote,
	updatedNote,
	savingNewNote,
	setActiveNote,
	setNotes,
	setSaving,
} = journalSlice.actions;