import { getDisplayName } from '@mui/utils';
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
        status:'not-authenticated', //not-authenticated,'autenticated'
        uid:null,
        email:null,
        displayName:null,
        photoURL:null,
        errorMessage:null
        
    },
	reducers: {		
        login:(state,{payload})=>{             
                console.log(payload);   
                state.status='authenticated', //not-authenticated,'autenticated'
                state.uid =payload.uid;
                state.email=payload.email;
                state.displayName=payload.displayName;
                state.photoURL=payload.photoURL;
                state.errorMessage=null;        
                    
        },
        logout:(state,{payload})=>{
        state.status='not-authenticated', //not-authenticated,'autenticated'
        state.uid =null;
        state.email=null;
        state.displayName=null;
        state.photoURL=null;
        state.errorMessage=payload.message;
        
        },
        checkingCredentials:(state)=>{
                state.status="checking"         
        }
	}
});
export const { login,logout,checkingCredentials } = authSlice.actions;
