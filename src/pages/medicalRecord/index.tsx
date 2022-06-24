import { Avatar, Button, CircularProgress, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material"
import ArticleIcon from '@mui/icons-material/Article';
import NiceModal from '@ebay/nice-modal-react';
import { useParams } from "react-router-dom"
import esLocale from 'date-fns/locale/es'
import format from 'date-fns/format'
import { useMedicalRecords } from "../../api/patient"
import { useAuth } from "../../redux/store"
import MedicationIcon from '@mui/icons-material/Medication';
import ListDataUser from "../../components/home/ListDataUser"
import Diseases from "../../components/common/Diseases"

const MedicalRecord = () => {
  const params = useParams<{ id: string }>()
  const auth = useAuth()
  const medicalRecords = useMedicalRecords(params.id, auth.user?.healthProfessionalId)

  if (medicalRecords.isLoading) {
    return <CircularProgress />
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Typography variant="h1" component="h1" >Ficha clinica de {medicalRecords.data.patient.name}</Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Button variant="contained" fullWidth onClick={() => {
          NiceModal.show('newMedicalRecord', { patientId: params.id })
        }}>Agregar evaluacion</Button>
      </Grid>

      <Grid item xs={12} md={6}>
        <ListDataUser data={medicalRecords.data.patient} />
      </Grid>

      <Grid item xs={12} md={6}>
        <Diseases diseases={medicalRecords.data.diseases}/>
      </Grid>

      {
        medicalRecords.data.lastMedicalRecord ? 
        <Grid item container xs={12} md={6}>
          <Grid item xs={12}>
            <Typography variant='h2' component="h2">Medicamentos actuales</Typography>
            <Typography variant='body1' component="p">Desde { format(new Date(medicalRecords.data.lastMedicalRecord.startDate), "EEEE dd 'de' MMMM", { locale: esLocale }) } hasta { format(new Date(medicalRecords.data.lastMedicalRecord.endDate), "EEEE dd 'de' MMMM", { locale: esLocale }) }</Typography>
          </Grid>
      
          <Grid item xs={12}>
            <List>
              { medicalRecords.data.lastMedicalRecord.medicineLines.map((item: any) => 
                <ListItem key={item.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <MedicationIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.name} secondary={`${item.dose} (${item.management})`}/>
                </ListItem>) }
            </List>
          </Grid>
        </Grid> : 
          <Grid item container xs={12} md={6}>
            <Grid item xs={12}>
              <Typography variant='h2' component="h2">Sin medicamentos actuales</Typography>
            </Grid>
        </Grid>
      }

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
                  <ListItemText primary={ format(new Date(item.createdAt), "'Ingresado el dia' EEEE dd 'de' MMMM", { locale: esLocale }) } secondary={`${item.medicineLines.length} medicamentos asignados`}/>
                </ListItemButton>)}
            </List>
          </Grid>
        </Grid> : 
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Typography variant='h2' component="h2">Sin historial de registros medicos</Typography>
            </Grid>
        </Grid>}
    </Grid>
  )
}

export default MedicalRecord