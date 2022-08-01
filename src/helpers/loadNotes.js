import { collection, getDocs } from 'firebase/firestore';
import { FireBaseDB } from '../firebase/config';

export const loadNotes = async (uid = '') => {
	if (!uid) throw new Error('El uid del usuario no existe');
	const nostesRef = await getDocs(collection(FireBaseDB, `${uid}/journal/notes`));
	const notes = [];
	nostesRef.forEach((s) =>
		notes.push({
			id: s.id,
			...s.data()
		}) 
	);

	return notes;    

};
