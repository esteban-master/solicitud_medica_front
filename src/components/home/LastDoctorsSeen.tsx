import { Grid, Typography } from "@mui/material"
import { HealthProfessional } from "../../models/healthProfessional"
import ListProfessional from "../scheduleModal/ListProfessional"

const LastDoctorsSeen = ({ healthProfessionals }: { healthProfessionals: HealthProfessional[] }) => {

  return (
    <Grid item container>
      <Grid item xs={12}>
        <Typography variant='h2' component="h2">Últimos médicos vistos</Typography>
      </Grid>
      <Grid item xs={12}>
        <ListProfessional data={healthProfessionals}/>
      </Grid>
    </Grid>
  )
}

export default LastDoctorsSeen