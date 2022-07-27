import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { FireBaseAuth } from '../firebase/config';

import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { login, logout } from '../store/auth';
import { CheckingAuth } from '../ui/components';

export const AppRouter = () => {
    
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

			//console.log(user);
		});
	}, []);

	if (status === 'checking') {
		return <CheckingAuth />;
	}
	return (
		<Routes>
            {
                (status==='authenticated')
                ?<Route path="/*" element={<JournalRoutes />} />
                :<Route path="/auth/*" element={<AuthRoutes />} />                
            }
            <Route path='/*' element={<Navigate to="/auth"/>}></Route>
			
			
		</Routes>
	);
};
