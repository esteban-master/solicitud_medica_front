import { useModal } from "@ebay/nice-modal-react"
import { Button, Grid, Typography } from "@mui/material"
import { SolicitudDialog } from "../../components/solicitudDialog"


const Home = () => {
  const solitudDialog = useModal(SolicitudDialog)
  return (
    <Grid container>
      <Grid container>
        <Grid>
          <Typography>Hola Nelida Leal</Typography>
          <Typography>Ultima solicitud medicamentos: 23 de Junio, 2022. (Hace 8 dias)</Typography>
          <Typography>Ultima atencion medica: 12 de Abril, 2022. (Hace 2 meses)</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="center"> 
        <Grid item>
          <Typography>Solicitar</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={2}> 
        <Grid item>
          <Button
            onClick={() => {
              solitudDialog.show({ title: 'Solicitud de medicamentos' })
            }} 
            variant="contained"
          >
            Medicamentos
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained"
            onClick={() => {
              solitudDialog.show({ title: 'Solicitud de atencion medica' })
            }} 
          >
            Atencion
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home