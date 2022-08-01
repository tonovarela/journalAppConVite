import { DataArrayRounded, SaveOutlined } from '@mui/icons-material';
import { Grid, Typography, Button, TextField,  } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useFom';
import { ImageGallery } from '../components';

export const NoteView = () => {
	const { active: note } = useSelector((state) => state.journal);

	const { body, title, onInputChange, date, formState } = useForm(note);
  const dateString =useMemo(()=>{
    const fecha = new Date(date);
    return fecha.toUTCString();
  },[date])
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
				<Button color="primary">
					<SaveOutlined xs={{ fontSize: 30, mr: 1 }} />
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

			<ImageGallery />
		</Grid>
	);
};
