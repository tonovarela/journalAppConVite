import { singInWithGoogle } from "../../firebase/providers/providers"
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