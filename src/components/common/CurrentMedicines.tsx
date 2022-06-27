import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import MedicationIcon from '@mui/icons-material/Medication';
import { MedicalRecord } from "../../models/MedicalRecord"
import { formatDate } from "../../utils/formatDate";


const CurrentMedicines = ({ medicalRecord }: { medicalRecord: MedicalRecord | undefined }) => {

  return (
  <Grid item container>
    { medicalRecord && medicalRecord.medicineLines.length > 0 ?
      <>
        <Grid item xs={12}>
          <Typography variant='h2' component="h2">Medicamentos actuales</Typography>
          <Typography variant='body1' component="p">Desde { formatDate(medicalRecord.startDate, "EEEE dd 'de' MMMM") } hasta { formatDate(medicalRecord.endDate, "EEEE dd 'de' MMMM") }</Typography>
        </Grid>

        <Grid item xs={12}>
          <List>
            { medicalRecord.medicineLines.map((item: any) => 
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
      </> : 
      <Grid item xs={12}>
        <Typography variant='h2' component="h2">Sin medicamentos actuales</Typography>
      </Grid>}
  </Grid>
  )
}

export default CurrentMedicines