import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';




export const RegisterPage = () => {
  return (
    <AuthLayout title='Registrate'>
			
			<form>
				<Grid container>
        <Grid item xs={12} sx={{ mt: 2 }}>
						<TextField label="Nombre" type="text" fullWidth placeholder="Marco Antonio Estelles" />
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField label="Correo" type="email" fullWidth placeholder="varela@gmail.com" />
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField label="Contaseña" type="password" fullWidth placeholder="123" />
					</Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
						<TextField label="Confirma la contaseña" type="password2" fullWidth placeholder="123" />
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} >
							<Button variant="contained" fullWidth>								
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
  )
}
