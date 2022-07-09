import { Grid, Paper, Typography } from "@mui/material";
import esLocale from 'date-fns/locale/es'
import format from 'date-fns/format'
import { useShedule } from "../../state/context/SheduleContext";
import { useAuth } from "../../redux/store";

const StepThree = () => {
  const { state: { date, professional }} = useShedule();
  const auth = useAuth()
  return (
    <Grid item xs={12}>
      <Paper elevation={3}>
        <Grid container padding={2}>
          <Grid item container>
            <Grid item xs={5}>
                <Typography style={{ fontWeight: 'bold' }}>Profesional</Typography>
            </Grid>
            <Grid item xs={7}>
                <Typography>{ professional.name }</Typography>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={5}>
                <Typography style={{ fontWeight: 'bold' }}>Fecha</Typography>
            </Grid>
            <Grid item xs={7}>
                <Typography>
                  { format(new Date(date), "'El día 'EEEE dd 'de' MMMM 'a las' HH:mm 'hrs.'", { locale: esLocale }) }
                </Typography>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={5}>
                <Typography style={{ fontWeight: 'bold' }}>Direccion</Typography>
            </Grid>
            <Grid item xs={7}>
                <Typography>{ auth.user?.address }</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default StepThree;