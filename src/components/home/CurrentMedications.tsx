import { Grid, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material'
import MedicationIcon from '@mui/icons-material/Medication';

const CurrentMedications = () => {
  return (
    <Grid item container xs={12} md={6}>
      <Grid item xs={12}>
        <Typography variant='h2' component="h2">Medicamentos actuales</Typography>
        <Typography variant='body1' component="p">Desde 20 Mar, 2020 hasta 30 Mar, 2020</Typography>
      </Grid>
  
      <Grid item xs={12}>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <MedicationIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Paracetamol 2 comp. de 500 mg" secondary="cada 24 hrs"/>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <MedicationIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Enalapril de 10 mg" secondary="1 comp. en la mañana"/>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <MedicationIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Losartan 50 mg" secondary="1 comp. en la tarde"/>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <MedicationIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cerocoxib 200 mg" secondary="1 comp. en la tarde"/>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  )
}

export default CurrentMedications;