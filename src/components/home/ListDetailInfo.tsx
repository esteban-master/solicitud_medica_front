import { Grid, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material'
import MedicationIcon from '@mui/icons-material/Medication';

const ListDetailInfo = () => {
  return (
    <Grid container item spacing={3}>
      <Grid item>
        <Typography variant='h2' component="h2">Antecedentes mórbidos</Typography>
        <Typography variant='body1' component="p">Diabetes - Hipertencion arterial - Obesidad - Artitris reumatoide </Typography>
      </Grid>
      <Grid item container>
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
    </Grid>
  )
}

export default ListDetailInfo