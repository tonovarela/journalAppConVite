import { checkingCredentials } from "./"


export const checkAuthetication =(email,password)=>{
    return async(dispatch)=>{
    dispatch(checkingCredentials())

    }
}

export const startGoogleSignIn =()=>{
    return async(dispatch)=>{
        dispatch(checkingCredentials())
    }
}