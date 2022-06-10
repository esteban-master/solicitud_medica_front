import { Button, Grid, Typography } from "@mui/material"
import ListDataUser from "../../components/home/ListDataUser"
import CurrentMedications from "../../components/home/CurrentMedications"
import LastDoctorsSeen from "../../components/home/LastDoctorsSeen"
import NiceModal from '@ebay/nice-modal-react';
import { useShedule } from "../../state/context/SheduleContext"
import { toast } from 'react-toastify';

const Home = () => {
  const { changeState } = useShedule()
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
              .then(({ data, toastId }: any) => {
                toast.update(toastId, { render: "Hora creada correctamente", type: "success", isLoading: false, autoClose: 3000 })
              });            
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
    </Grid>
  )
}

export default Home