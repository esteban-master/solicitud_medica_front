import { Grid, Paper, Typography } from "@mui/material";
import esLocale from 'date-fns/locale/es'
import format from 'date-fns/format'
import { useShedule } from "../../state/context/SheduleContext";

const StepThree = () => {
  const { state: { date }} = useShedule();

  return (
    <Grid item xs={12}>
      <Paper elevation={3}>
        <Grid container padding={2}>
          <Grid item container>
            <Grid item xs={5}>
                <Typography style={{ fontWeight: 'bold' }}>Profesional</Typography>
            </Grid>
            <Grid item xs={7}>
                <Typography>Remy Sharp</Typography>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={5}>
                <Typography style={{ fontWeight: 'bold' }}>Fecha</Typography>
            </Grid>
            <Grid item xs={7}>
                <Typography>
                  { format(date, "'El día 'EEEE dd 'de' MMMM 'a las' HH:mm 'hrs.'", { locale: esLocale }) }
                </Typography>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={5}>
                <Typography style={{ fontWeight: 'bold' }}>Direccion</Typography>
            </Grid>
            <Grid item xs={7}>
                <Typography>Carampague #0354, Temuco</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default StepThree;