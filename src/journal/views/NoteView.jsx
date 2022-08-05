import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Grid, Typography, Button, TextField, IconButton } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useFom';
import { setActiveNote, startSaveNote, startUploadingFiles } from '../../store/journal';
import { ImageGallery } from '../components';
import Swal from 'sweetalert2';
//import 'sweetalert2/dist/sweetalert2.css'
import { startDeletingNote } from '../../store/journal/thunks';

export const NoteView = () => {
	const dispatch = useDispatch();

	const { active: note, MessageSaved, isSaving } = useSelector((state) => state.journal);
	const { body, title, onInputChange, date, formState } = useForm(note);

	useEffect(
		() => {
			if (MessageSaved.length > 0) {
				Swal.fire('Nota actualizada', MessageSaved, 'success');
			}
		},
		[MessageSaved]
	);

	useEffect(
		() => {
			dispatch(setActiveNote(formState));
		},
		[formState]
	);

	const dateString = useMemo(
		() => {
			const fecha = new Date(date);
			return fecha.toUTCString();
		},
		[date]
	);
	const onSaveNote = () => {
		dispatch(startSaveNote());
	};
	const onDelete = async () => {

		const { isConfirmed } = await Swal.fire({
			title: 'Esta seguro de borrar?',
			text: "Estos cambios no son reversibles",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, borrarlo'
		});
		if (isConfirmed) {
			dispatch(startDeletingNote())
			Swal.fire(
				'Borrado!',
				'El archivo ha sido borrado con exito.',
				'success'
			)
		}

	};
	const onFileInputChange = ({ target }) => {
		const { files } = target
		if (files.length == 0) {
			return;
		}
		dispatch(startUploadingFiles(files));

	};

	return (
		<Grid
			container
			className="animate__animated animate__fadeIn animate__faster"
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			sx={{ mb: 1 }}
		>
			<Grid item>
				<Typography fontSize={39} fontWeight="light">
					{dateString}
				</Typography>
			</Grid>
			<Grid item>
				<IconButton>
					<label htmlFor="btnFile">
						<UploadOutlined />
					</label>
				</IconButton>
				<input
					id="btnFile"
					style={{ display: "none" }}
					type="file"
					multiple
					onChange={onFileInputChange}
				/>
				<Button disabled={isSaving} onClick={onSaveNote}>
					<SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
					Guardar
				</Button>
			</Grid>
			<Grid container>
				<TextField
					type="text"
					variant="filled"
					name="title"
					value={title}
					onChange={onInputChange}
					fullWidth
					placeholder="Ingrese su título"
					label="Título"
					sx={{ border: 'none', mb: 1 }}
				/>
				<TextField
					type="text"
					variant="filled"
					fullWidth
					name="body"
					value={body}
					onChange={onInputChange}
					multiline
					placeholder="¿Que sucedió en el día de hoy?"
					minRows={5}
					sx={{ border: 'none', mb: 1 }}
				/>
			</Grid>

			<Grid container justifyContent='end'>
				<Button
					onClick={onDelete}
					sx={{ mt: 2 }}
					color="error"
				>
					<DeleteOutline></DeleteOutline>
					Borrar
				</Button>

			</Grid>

			<ImageGallery
				images={note.imageUrls}
			/>
		</Grid>
	);
};
