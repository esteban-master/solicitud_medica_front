import { useState } from "react";
import { Alert, Button, Grid, Snackbar, Typography } from "@mui/material"
import ListDataUser from "../../components/home/ListDataUser"
import CurrentMedications from "../../components/home/CurrentMedications"
import LastDoctorsSeen from "../../components/home/LastDoctorsSeen"
import NiceModal from '@ebay/nice-modal-react';
import { useShedule } from "../../state/context/SheduleContext"

const Home = () => {
  const { changeState } = useShedule()
  const [successRequest, setSuccessRequest] = useState({open: false, message: ''})
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Typography variant="h1" component="h1" >Hola Nelida Leal</Typography>
      </Grid>
      <Grid xs={12} md={6} item container justifyContent={['center', 'center', 'end']}> 
        <Button 
          variant="contained" 
          style={{
            backgroundColor: '#AF061B'
          }}
          fullWidth
          size="large"
          onClick={() => {
            changeState({ activeStep: 0 })
            NiceModal
              .show('scheduleModal')
              .then(res => {
                setSuccessRequest({ open: true, message: 'Solicitud creada exitosamente' })
              })
          }}
        >
          Solicitar hora medica
        </Button>
      </Grid>

      <ListDataUser 
        data={{
          name: "Nelida Leal",
          address: "Carampangue 0146 Pob. Lanin",
          phoneNumber: '839484782734',
          responsibleFamily: "Esteban Beltran (nieto)",
          age: 78
        }} 
      />

      <Grid item xs={12} md={6}>
        <Typography variant='h2' component="h2">Antecedentes mórbidos</Typography>
        <Typography variant='body1' component="p">Diabetes - Hipertencion arterial - Obesidad - Artitris reumatoide </Typography>
      </Grid>

      <CurrentMedications />
      <LastDoctorsSeen />

      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={successRequest.open}
        onClose={() => setSuccessRequest(prev => ({...prev, open: false}))}
        message={successRequest.message}
      >
        <Alert onClose={() => setSuccessRequest(prev => ({...prev, open: false}))} severity="success" sx={{ width: '100%' }}>
          {successRequest.message}
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default Home