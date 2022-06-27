import { List ,Avatar, Button, CircularProgress, Grid, ListItem, ListItemAvatar, ListItemText, Typography, ListItemButton, IconButton, Tooltip } from '@mui/material';
import { useShedule } from '../../state/context/SheduleContext';
import { toast } from 'react-toastify';
import EventIcon from '@mui/icons-material/Event';
import MedicationIcon from '@mui/icons-material/Medication';
import ListDataUser from './ListDataUser';
import NiceModal from '@ebay/nice-modal-react';
import { UserEntity } from '../../redux/auth/authSlice';
import { useCanceledMedicalCare, useNextMedicalCare } from '../../api/medicalCare';
import esLocale from 'date-fns/locale/es'
import format from 'date-fns/format'
import { useQueryClient } from 'react-query';
import { useAuth } from '../../redux/store';
import { useLastHealthProfessionalsSeen, useMedicalRecords } from '../../api/patient';
import CurrentMedicines from '../common/CurrentMedicines';

const PatientData = ({ data }: { data: UserEntity | null }) => {
  const { state ,changeState } = useShedule()
  const nextMedicalCare = useNextMedicalCare({ date: new Date(), patientId: data?.patientId })
  const canceledMedicalCare = useCanceledMedicalCare()
  const medicalRecords = useMedicalRecords(data?.patientId, 0)
  const lastHealthProfessionalsSeen = useLastHealthProfessionalsSeen(data?.patientId)
  const auth = useAuth()
  const queryClient = useQueryClient()


  console.log({lastHealthProfessionalsSeen})

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
                NiceModal.show('confirmDialog', { message: "¿Realmente desea cancelar esta hora médica?", title: 'Cancelar hora médica' }).then(() => {
                  changeState({ isLoading: true })
                  canceledMedicalCare.mutate(nextMedicalCare.data.id, {
                    onSuccess: (data) => {
                      queryClient.setQueryData(['nextMedicalCare', auth.user?.patientId], null )
                      changeState({ isLoading: false })
                      toast.success('Hora cancelada', { position: toast.POSITION.BOTTOM_CENTER })
                    }
                  })
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

      { !medicalRecords.isLoading && medicalRecords.data ?
        <>
          <Grid item xs={12}>
            <ListDataUser
              data={medicalRecords.data.patient} 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CurrentMedicines medicalRecord={medicalRecords.data.lastMedicalRecord} />
          </Grid>
        </> : <CircularProgress />     
      }

      { lastHealthProfessionalsSeen.isSuccess && lastHealthProfessionalsSeen.data ?  
       <Grid item xs={12} md={6}>
         <Grid item container spacing={2}>
          <Grid item xs={12}>
           <Typography variant='h2' component="h2">Últimos profesionales vistos</Typography>
           <Typography variant='body1' component="p">Has tenido cita con {Object.values(lastHealthProfessionalsSeen.data).length} profesionales.</Typography>
         </Grid>
         <Grid item xs={12}>
            <List dense>
              
            
            { Object.values(lastHealthProfessionalsSeen.data).map((item, index) => {
              const professionals = item.map(itemData => itemData.professional);
              const dates = item.map(itemData => itemData.date)
              const [professional] = professionals;
              return (
                <ListItem
                  key={index}
                  secondaryAction={
                    <Tooltip title="Agendar cita">
                      <IconButton 
                        onClick={() => {
                          changeState({ professional, activeStep: 1 })
                          NiceModal.show('scheduleModal').then(({ data, toastId }: any) => {
                            toast.update(toastId, { render: "Hora creada correctamente", type: "success", isLoading: false, autoClose: 3000 })
                        });  
                        }}
                      >
                      <EventIcon color="primary"/>
                    </IconButton>
                    </Tooltip>
                  }
                >
                <Tooltip title="Ver historial de citas">
                  <ListItemButton
                    onClick={() => {
                      NiceModal.show('medicalRecordHistory', { professional, dates })
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <MedicationIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${professional.name} (${professional.professionName})`} />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
                )
              }) }
              </List>
         </Grid>
        </Grid>
       </Grid> : 
        <CircularProgress /> 
      }
     
      
    </Grid>
  )
}

export default PatientData