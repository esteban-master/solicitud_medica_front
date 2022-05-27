import { Button, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import ListDataUser from "../../components/home/ListDataUser"
import CurrentMedications from "../../components/home/CurrentMedications"
import LastDoctorsSeen from "../../components/home/LastDoctorsSeen"

const Home = () => {
  let navigate = useNavigate();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Typography variant="h1" component="h1" >Hola Nelida Leal</Typography>
      </Grid>
      <Grid xs={12} md={6} item container justifyContent={['center', 'center', 'end']}> 
        <Button 
          variant="contained" 
          style={{
            backgroundColor: '#AF061B'
          }}
          fullWidth
          size="large"
          onClick={() => navigate('/agendar')}
        >
          Solicitar hora medica
        </Button>
      </Grid>

      <ListDataUser 
        data={{
          name: "Nelida Leal",
          address: "Carampangue 0146 Pob. Lanin",
          phoneNumber: '839484782734',
          responsibleFamily: "Esteban Beltran (nieto)",
          age: 78
        }} 
      />

      <Grid item xs={12} md={6}>
        <Typography variant='h2' component="h2">Antecedentes mórbidos</Typography>
        <Typography variant='body1' component="p">Diabetes - Hipertencion arterial - Obesidad - Artitris reumatoide </Typography>
      </Grid>

      <CurrentMedications />
      <LastDoctorsSeen />
    </Grid>
  )
}

export default Home