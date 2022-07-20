// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDs_CdZIqZhv9S3-A0XY9BFog7BLkLBxOI',
	authDomain: 'react-curso-2a343.firebaseapp.com',
	projectId: 'react-curso-2a343',
	storageBucket: 'react-curso-2a343.appspot.com',
	messagingSenderId: '606814927279',
	appId: '1:606814927279:web:7182fa378c14a63c96d75a'
};

// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth(FireBaseApp);
export const FireBaseDB   = getFirestore(FireBaseApp);
