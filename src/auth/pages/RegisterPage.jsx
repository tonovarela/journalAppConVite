import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useFom';
import { startCreatingUserWithEmailPassword } from '../../store/auth';
import { useMemo } from 'react';



const formData = {
	email: 'tonovarela@live.com',
	password: '123456',
	displayName: 'Marco Antonio Estelles Martínez'
};

const formValidations = {
	email: [ (value) => value.includes('@'), 'El correo debe de contener una @' ],
	password: [ (value) => value.length >= 6, 'El password debe tener mas de 6 letras' ],
	displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio' ]
};

export const RegisterPage = () => {

	const dispatch = useDispatch();
	const {
		displayName,
		email,
		password,
		onInputChange,
		formState,
		displayNameValid,
		isFormValid,
		emailValid,
		passwordValid
	} = useForm(formData,formValidations);

	const {status,errorMessage}  = useSelector(state=> state.auth);

	const isCheckingAuthentication =  useMemo(()=>status ==='checking',[status]);


 
	const [formSubmitted, setFormSubmitted] = useState(false)

	const onSubmit = (event) => {
		event.preventDefault();
		setFormSubmitted(true);
		if (!isFormValid) return;
		dispatch(startCreatingUserWithEmailPassword(formState))
		
	};
	return (
		<AuthLayout title="Crear cuenta">		
			<form onSubmit={onSubmit}>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							name="displayName"
							onChange={onInputChange}
							value={displayName}
							label="Nombre"
							type="text"
							fullWidth
							error={!!displayNameValid && formSubmitted}
							helperText={displayNameValid}							
							placeholder="Marco Antonio Estelles"
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							name="email"
							value={email}
							onChange={onInputChange}
							label="Correo"
							type="email"
							fullWidth
							error={!!emailValid && formSubmitted}
							helperText={emailValid}
							placeholder="varela@gmail.com"
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							name="password"
							value={password}
							onChange={onInputChange}
							label="Contaseña"
							type="password"
							error={!!passwordValid && formSubmitted}
							helperText={passwordValid}
							fullWidth
							placeholder="123"
						/>
					</Grid>
					{/* <Grid item xs={12} sx={{ mt: 2 }}>
						<TextField label="Confirma la contaseña" type="password2" fullWidth placeholder="123" />
					</Grid> */}

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

					<Grid item
					display={!!errorMessage ?'':'none'}
					 xs={12}>
						<Alert severity='error'>
							{errorMessage}
						</Alert>
						</Grid>
						<Grid item xs={12}>
							<Button
							disabled={isCheckingAuthentication}
							type="submit" variant="contained" fullWidth>
								Registro
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid container direction="row" justifyContent="end">
					<Typography>¿Tienes una cuenta? </Typography>
					<Link component={RouterLink} color="inherit" to="/auth/login">
						Ingresa
					</Link>
				</Grid>
			</form>
		</AuthLayout>
	);
};
