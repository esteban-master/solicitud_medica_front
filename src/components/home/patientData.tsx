import { Button, Grid, Typography } from '@mui/material';
import { useShedule } from '../../state/context/SheduleContext';
import { toast } from 'react-toastify';
import CurrentMedications from './CurrentMedications';
import LastDoctorsSeen from './LastDoctorsSeen';
import ListDataUser from './ListDataUser';
import NiceModal from '@ebay/nice-modal-react';
import { UserEntity } from '../../redux/auth/authSlice';
import { useCanceledMedicalCare, useNextMedicalCare } from '../../api/medicalCare';
import esLocale from 'date-fns/locale/es'
import format from 'date-fns/format'
import { useQueryClient } from 'react-query';
import { useAuth } from '../../redux/store';

const PatientData = ({ data }: { data: UserEntity | null }) => {
  const { state ,changeState } = useShedule()
  const nextMedicalCare = useNextMedicalCare({ date: new Date(), patientId: data?.patientId })
  const canceledMedicalCare = useCanceledMedicalCare()
  const auth = useAuth()
  const queryClient = useQueryClient()
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Typography variant="h1" component="h1" >Bienvenido/a { data?.name }</Typography>
      </Grid>
      { nextMedicalCare.isSuccess && nextMedicalCare.data ?
        <Grid  xs={12} md={6} item container justifyContent={['center', 'center', 'end']}> 
          <Grid 
            sx={{
              backgroundColor: '#E5F1FF',
              borderTopLeftRadius: '1em',
              borderTopRightRadius: '1em',
              padding: '1em'
            }} 
            item xs={12}
          >
            <Typography
              variant="h4">
                Tienes una hora para {format(new Date(nextMedicalCare.data.date), "'el día 'EEEE dd 'de' MMMM 'a las' HH:mm 'hrs.'", { locale: esLocale })} 
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button 
              fullWidth 
              variant="contained" 
              style={{
                backgroundColor: '#AF061B'
              }}
              onClick={() => {
                changeState({ isLoading: true })
                canceledMedicalCare.mutate(nextMedicalCare.data.id, {
                  onSuccess: (data) => {
                    queryClient.setQueryData(['nextMedicalCare', auth.user?.patientId], null )
                    changeState({ isLoading: false })
                    toast.success('Hora cancelada', { position: toast.POSITION.BOTTOM_CENTER })
                  }
                })
              }}
            >
              { state.isLoading ? 'Cancelando...' : 'Cancelar hora' }
            </Button>
          </Grid>
      </Grid> :
        <Grid xs={12} md={6} item container justifyContent={['center', 'center', 'end']}> 
          <Button 
            variant="contained" 
            fullWidth
            size="large"
            onClick={(e) => {
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
        </Grid>}
      

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