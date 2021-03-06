import { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useFom';
import { checkAuthetication, startGoogleSignIn } from '../../store/auth';

export const LoginPage = () => {
	const { status } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const { email, password, onInputChange } = useForm({
		email: 'tonovarela@live.com',
		password: '123456'
	});

	const isAuthenticating = useMemo(() => status === 'checking', [ status ]);

	const onSubmit = (event) => {
		event.preventDefault();
		console.log(email, password);
		dispatch(checkAuthetication());
	};
	const onGoogleSignIn = () => {
		console.log('onGoogleSignIn');
		dispatch(startGoogleSignIn());
	};

	return (
		<AuthLayout title="Login">
			<form onSubmit={onSubmit}>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Correo"
							type="email"
							fullWidth
							placeholder="varela@gmail.com"
							name="email"
							value={email}
							onChange={onInputChange}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Contaseña"
							type="password"
							fullWidth
							placeholder="123"
							value={password}
							onChange={onInputChange}
							name="password"
						/>
					</Grid>
					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} sm={6}>
							<Button type="submit" variant="contained" disabled={isAuthenticating} fullWidth>
								{' '}
								Login
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								type="button"
								disabled={isAuthenticating}
								onClick={onGoogleSignIn}
								variant="contained"
								fullWidth
							>
								<Google />
								<Typography sx={{ ml: 1 }}>Google</Typography>
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid container direction="row" justifyContent="end">
					<Link component={RouterLink} color="inherit" to="/auth/register">
						Crear una cuenta
					</Link>
				</Grid>
			</form>
		</AuthLayout>
	);
};
