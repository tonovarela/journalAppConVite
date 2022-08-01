import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal/thunks';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';

export const JournalPage = () => {
	const {isSaving,active}= useSelector((state) => state.journal);
	const dispatch = useDispatch();
	const onClickNote = () => {
		dispatch(startNewNote());
	};
	return (
		<JournalLayout>
			{ !!active? <NoteView /> :<NothingSelectedView />}
		
			<IconButton
				
				onClick={onClickNote}
				size="large"
				disabled={isSaving}
				sx={{
					color: 'white',
					backgroundColor: 'error.main',
					':hover': { backgroundColor: 'error.main', opacity: 0.9 },
					position: 'fixed',
					bottom: 50,
					right: 50
				}}
			>
				<AddOutlined sx={{ fontSize: 30 }} />
			</IconButton>
		</JournalLayout>
	);
};
