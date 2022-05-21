import { Grid, Typography } from "@mui/material"
import { Fragment } from "react"

type User = {
  name: string,
  address: string,
  age: number,
  phoneNumber: string,
  responsibleFamily: string
}

const ListDataUser = ({ data }: { data: User }) => {
  
  return (
    <Grid container item spacing={1}>
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
          <Typography variant="body1" component="p">{data.phoneNumber}</Typography>
        </Grid>
      </Grid>
      
      <Grid container item xs={12}>
        <Grid item xs={4}>
          <Typography variant="h4" component="h4">Familiar responsable</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" component="p">{data.responsibleFamily}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ListDataUser