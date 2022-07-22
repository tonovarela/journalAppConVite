import { singInWithGoogle,registerUserWithEmailPassword } from "../../firebase/providers/providers"
import { checkingCredentials ,logout,login} from "./"




export const checkAuthetication =(email,password)=>{
    return async(dispatch)=>{
    dispatch(checkingCredentials())

    }
}

export const startGoogleSignIn =()=>{
    return async(dispatch)=>{      
        dispatch(checkingCredentials())
        const result = await singInWithGoogle();
        if (!result.ok){
            dispatch(logout(result.errorMessage))
            return;
        }
        dispatch(login(result));
    }
}

export const startCreatingUserWithEmailPassword =({email,password,displayName})=>{
    return async(dispatch)=>{
        dispatch(checkingCredentials());
        
    
        const {ok,uid,photoURL,errorCode,}  = await registerUserWithEmailPassword({email,password,displayName});        
        if(!ok){            
            return dispatch(logout(errorCode));
        }
        dispatch(login({uid,displayName,email,photoURL}));
     

    }
}