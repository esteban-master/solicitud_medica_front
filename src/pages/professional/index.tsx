import { CircularProgress, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NiceModal from '@ebay/nice-modal-react';
import { useShedule } from "../../state/context/SheduleContext"
import { usePatientsOfAProfessional } from "../../api/healthProfessionals";
import { useAuth } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const Professional = () => {
  const auth = useAuth()
  const patientsOfAProfessional = usePatientsOfAProfessional(auth.user?.healthProfessionalId)
  const { changeState } = useShedule()
  const navigate = useNavigate()

  return (
    <Grid container spacing={3}>
       <Grid item xs={12}>
        <Typography variant="h1" component="h1">Bienvenindo { auth?.user?.name }</Typography>
       </Grid>
       <Grid item xs={12}>
        <Typography variant="h2" component="h2">Administracion de pacientes</Typography>
       </Grid>
       
       <Grid item container xs={12} spacing={3}>
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
                          <TableCell>{item.taxNumber}</TableCell>
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