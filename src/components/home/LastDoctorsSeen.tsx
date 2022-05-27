import { Grid, Typography } from "@mui/material"
import ListProfessional from "../schedule/ListProfessional"

const LastDoctorsSeen = () => {
  return (
    <Grid item container xs={12} md={6}>
      <Grid item xs={12}>
        <Typography variant='h2' component="h2">Últimos médicos vistos</Typography>
      </Grid>
      <ListProfessional />
    </Grid>
  )
}

export default LastDoctorsSeen