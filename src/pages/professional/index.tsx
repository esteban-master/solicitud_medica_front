import { CircularProgress, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NiceModal from '@ebay/nice-modal-react';
import { useShedule } from "../../state/context/SheduleContext"
import { usePatientsOfAProfessional, useUpcomingAppointments } from "../../api/healthProfessionals";
import { useAuth } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { formatRut } from 'chilerut'
import EventIcon from '@mui/icons-material/Event';
import { formatDate } from "../../utils/formatDate";
import startOfDay from 'date-fns/startOfDay'
import isEqual from 'date-fns/isEqual'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useUpdateMedicalCare } from "../../api/medicalCare";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

const Professional = () => {
  const auth = useAuth()
  const patientsOfAProfessional = usePatientsOfAProfessional(auth.user?.healthProfessionalId)
  const { changeState } = useShedule()
  const navigate = useNavigate()
  const upcomingAppointments = useUpcomingAppointments(auth.user?.healthProfessionalId)
  const updateMedicalCare = useUpdateMedicalCare()
  const queryClient = useQueryClient()

  return (
    <Grid container spacing={3}>
       <Grid item xs={12}>
        <Typography variant="h1" component="h1">Bienvenindo { auth?.user?.name }</Typography>
       </Grid>
       
       <Grid item container>
        <Grid item xs={12}>
          <Typography variant="h2" component="h2">Proximas citas</Typography>
        </Grid>
        { upcomingAppointments.isSuccess && upcomingAppointments.data ? 
          <Grid item xs={12}>
            <List>
              { upcomingAppointments.data.map(item => {
                const isToday = isEqual(startOfDay(new Date(item.medicalCare.date)), startOfDay(new Date()))
                return <ListItem key={item.medicalCare.id} secondaryAction={
                  <>
                    { item.medicalCare.attended && 
                      <Tooltip title="Atentido">
                        <IconButton color="success">
                          <CheckCircleIcon />
                        </IconButton>
                      </Tooltip> 
                    }
                    { !item.medicalCare.attended && 
                      <Tooltip title="Marcar como atendido">
                        <IconButton color="primary" onClick={() => {
                          updateMedicalCare.mutate({ id: item.medicalCare.id, attended: true }, {
                            onSuccess(data, variables, context) {
                              queryClient.invalidateQueries(['upcomingAppointments', data.healthProfessionalId])
                              toast.success('Paciente atendido', { position: toast.POSITION.BOTTOM_CENTER })
                            },
                          })
                        }}>
                          <CheckCircleOutlineIcon />
                        </IconButton>
                      </Tooltip> 
                    }
                  </>
                }>
                  <ListItemIcon>
                    <EventIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={formatDate(new Date(item.medicalCare.date), `${isToday ? "'Hoy'" : "'El día'"} EEEE dd 'de' MMMM 'a las' HH:mm 'hrs.'`)} 
                    secondary={`${item.patient.name} (${item.patient.age} años)`}
                  />
                </ListItem>
              }) }
            </List>
          </Grid>
         : <CircularProgress /> }
       </Grid>

       <Grid item container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h2" component="h2">Administracion de pacientes</Typography>
          </Grid>
          <Grid item container xs={12}>
            { !patientsOfAProfessional.isLoading && patientsOfAProfessional.isSuccess ? 
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Rut</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      { patientsOfAProfessional.data.map(item => 
                        <TableRow  key={item.patientId}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{formatRut(item.taxNumber)}</TableCell>
                          <TableCell>{item.phone}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={e => {
                                changeState({ anchorEl: e.currentTarget })
                                NiceModal.show('menuPatient', { patientId: item.patientId })
                                        .then((res: any) => {
                                          if (res.action === 'viewMedicalRecord') {
                                            navigate(`/paciente/${res.patientId}/ficha`)
                                          } else {
                                            NiceModal.show('newMedicalRecord', { patientId: item.patientId })
                                          }
                                        })
                              }}>
                              <MoreVertIcon />
                            </IconButton>
                          </TableCell>
                      </TableRow>) }
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid> : 
              <CircularProgress />}
          </Grid>
       </Grid>
    </Grid>
  )
}

export default Professional