import { Grid, Typography } from "@mui/material"
import { Patient } from "../../models/Patient"
import { formatRut } from 'chilerut'

const ListDataUser = ({ data }: { data: Patient  }) => {
  
  return (
    <Grid container item spacing={1} xs={12}>
      <Grid container item xs={12}>
        <Grid item xs={4}>
          <Typography variant="h4" component="h4">Dirección</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" component="p">{data.address}</Typography>
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={4}>
          <Typography variant="h4" component="h4">Edad</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" component="p">{data.age}</Typography>
        </Grid>
      </Grid>
      
      <Grid container item xs={12}>
        <Grid item xs={4}>
          <Typography variant="h4" component="h4">Contacto</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" component="p">{data.phone}</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={4}>
          <Typography variant="h4" component="h4">RUT</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" component="p">{formatRut(data.taxNumber)}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ListDataUser