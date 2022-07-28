import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FireBaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";

export const useCheckout = () => {    
    const { status } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	useEffect(() => {
		onAuthStateChanged(FireBaseAuth, async (user) => {
            if (!user){
                dispatch(logout());
                return
            }
            const {uid,email,displayName,photoUrl} =user;
            dispatch(login({uid,email,displayName,photoUrl}));
			
		});
	}, []);

 return {
    status
 }

}