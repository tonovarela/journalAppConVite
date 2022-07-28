import { SaveOutlined } from "@mui/icons-material"
import { Grid, Typography,Button, TextField } from "@mui/material"
import { ImageGallery } from "../components"


export const NoteView = () => {
  return (
    <Grid container
    className='animate__animated animate__fadeIn animate__faster'
     direction="row" 
    justifyContent="space-between"
    alignItems="center"
    sx={{mb:1}}
    >
        <Grid item>
            <Typography fontSize={39} fontWeight='light'>28 de agosto de 2023</Typography>
        </Grid>
        <Grid item>
            <Button color="primary">
                <SaveOutlined xs={{fontSize:30,mr:1}}/> 
                Guardar
            </Button>
        
        </Grid>
        <Grid container>
                <TextField type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese su título"
                label="Título"
                sx={{border:'none',mb:1}}
                />
                <TextField type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Que sucedió en el día de hoy?"                
                minRows={5}
                sx={{border:'none',mb:1}}
                />
            </Grid>

            <ImageGallery></ImageGallery>


    </Grid>
  )
}
