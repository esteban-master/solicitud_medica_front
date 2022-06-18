import { Button, Grid, Typography } from '@mui/material';
import { useShedule } from '../../state/context/SheduleContext';
import { toast } from 'react-toastify';
import CurrentMedications from './CurrentMedications';
import LastDoctorsSeen from './LastDoctorsSeen';
import ListDataUser from './ListDataUser';
import NiceModal from '@ebay/nice-modal-react';
import { UserEntity } from '../../redux/auth/authSlice';

const PatientData = ({ data }: { data: UserEntity | null }) => {
  const { changeState } = useShedule()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Typography variant="h1" component="h1" >Bienvenido/a { data?.name }</Typography>
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
        data={data} 
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