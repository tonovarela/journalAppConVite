import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
	name: 'journal',
	initialState: {
	  isSaving:true,
      MessageSaved:'',
      notes:[],
      active:null,
    //   active:{
    //     id:'ABC123', 
    //     title:'sdfdsfds',
    //     body:'',
    //     date:123445,
    //     imagesUrls:[]  //foto1,foto2,foto3
    //   }

	},
	reducers: {
		addNewEmptyNote:(state,action )=>{

        },
        setActiveNote:(state,action )=>{

        },
        setNotes:(state,action )=>{

        },
        setSaving:(state)=>{

        },
        saveNote:(state,action )=>{

        },
        deleteNoteByID:(state,action )=>{

        }
        
        
	}
});
export const { addNewEmptyNote,setActiveNote,setNotes,setSaving,saveNote,deleteNoteByID } = journalSlice.actions;
