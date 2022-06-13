import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { usePatient } from '../../api/patient';
import { useAuth } from '../../state/context/auth';
import { useShedule } from '../../state/context/SheduleContext';
import { toast } from 'react-toastify';
import CurrentMedications from './CurrentMedications';
import LastDoctorsSeen from './LastDoctorsSeen';
import ListDataUser from './ListDataUser';
import NiceModal from '@ebay/nice-modal-react';

const PatientData = () => {
  const { changeState } = useShedule()
  const auth = useAuth()
  const uid = auth.state.user?.uid;
  const patient = usePatient(uid);

  if (patient.isLoading) {
    return <CircularProgress />
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Typography variant="h1" component="h1" >Hola { patient.data?.name }</Typography>
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
        data={patient.data} 
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

export default PatientData