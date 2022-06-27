import { Avatar, Button, CircularProgress, Grid, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material"
import ArticleIcon from '@mui/icons-material/Article';
import NiceModal from '@ebay/nice-modal-react';
import { useParams } from "react-router-dom"
import { useMedicalRecords } from "../../api/patient"
import { useAuth } from "../../redux/store"
import ListDataUser from "../../components/home/ListDataUser"
import Diseases from "../../components/common/Diseases"
import CurrentMedicines from "../../components/common/CurrentMedicines";
import { formatDate } from "../../utils/formatDate";

const MedicalRecord = () => {
  const params = useParams<{ id: string }>()
  const auth = useAuth()
  const medicalRecords = useMedicalRecords(params.id, auth.user?.healthProfessionalId)

  return (
    <Grid container spacing={3}>
      { !medicalRecords.isLoading && medicalRecords.data ? 
        <>
          <Grid item xs={12} md={6}>
            <Typography variant="h1" component="h1" >Ficha clinica de {medicalRecords.data.patient.name}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button variant="contained" fullWidth onClick={() => {
              NiceModal.show('newMedicalRecord', { patientId: params.id })
            }}>Agregar evaluación</Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <ListDataUser data={medicalRecords.data.patient} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Diseases diseases={medicalRecords.data.diseases}/>
          </Grid>

          <CurrentMedicines medicalRecord={medicalRecords.data.lastMedicalRecord}/>
        
          { medicalRecords.data.medicalRecords.length > 0 ? 
            <Grid container item xs={12} md={6}>
              <Grid item xs={12}>
                <Typography variant='h2' component="h2">Historial de registros medicos</Typography>
              </Grid>
              <Grid item xs={12}>
                <List>
                  {medicalRecords.data.medicalRecords.map((item: any) => 
                    <ListItemButton key={item.id} onClick={() => {
                      NiceModal.show('medicalRecordInfo', { medicalRecord: item })
                    }}>
                      <ListItemAvatar>
                        <Avatar>
                          <ArticleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={ formatDate(item.createdAt, "'Ingresado el dia' EEEE dd 'de' MMMM") } secondary={`${item.medicineLines.length} medicamentos asignados`}/>
                    </ListItemButton>)}
                </List>
              </Grid>
            </Grid> : 
              <Grid container item xs={12}>
                <Grid item xs={12}>
                  <Typography variant='h2' component="h2">Sin historial de registros medicos</Typography>
                </Grid>
            </Grid>}
        </> : <CircularProgress />
      }
      
    </Grid>
  )
}

export default MedicalRecord