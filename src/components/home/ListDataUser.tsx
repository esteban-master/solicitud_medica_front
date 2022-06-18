import { Grid, Typography } from "@mui/material"
import { UserEntity } from "../../redux/auth/authSlice"

const ListDataUser = ({ data }: { data: UserEntity | null }) => {
  
  return (
    <Grid container item spacing={1} xs={12} md={6}>
      <Grid container item xs={12}>
        <Grid item xs={4}>
          <Typography variant="h4" component="h4">Dirección</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" component="p">{data?.address}</Typography>
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={4}>
          <Typography variant="h4" component="h4">Edad</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" component="p">{data?.age}</Typography>
        </Grid>
      </Grid>
      
      <Grid container item xs={12}>
        <Grid item xs={4}>
          <Typography variant="h4" component="h4">Contacto</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" component="p">{data?.phone}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ListDataUser