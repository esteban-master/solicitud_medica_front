import { Grid, Typography } from "@mui/material"
import { EntityResponse } from "../../api/entity"

const ListDataUser = ({ data }: { data: EntityResponse }) => {
  
  return (
    <Grid container item spacing={1} xs={12} md={6}>
      <Grid container item xs={12}>
        <Grid item xs={4}>
          <Typography variant="h4" component="h4">Dirección</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" component="p">{data.entity.address}</Typography>
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={4}>
          <Typography variant="h4" component="h4">Edad</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" component="p">{data.entity.age}</Typography>
        </Grid>
      </Grid>
      
      <Grid container item xs={12}>
        <Grid item xs={4}>
          <Typography variant="h4" component="h4">Contacto</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" component="p">{data.entity.phone}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ListDataUser