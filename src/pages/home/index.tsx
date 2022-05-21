import { useModal } from "@ebay/nice-modal-react"
import { Button, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import ListDataUser from "../../components/home/ListDataUser"
import ListDetailInfo from "../../components/home/ListDetailInfo"
import { SolicitudDialog } from "../../components/solicitudDialog"


const Home = () => {
  let navigate = useNavigate();
  const solitudDialog = useModal(SolicitudDialog)
  return (
    <Grid container spacing={3}>
      <Grid item>
        <Typography variant="h1" component="h1" >Hola Nelida Leal</Typography>
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

      <ListDetailInfo />

      
      <Grid item container justifyContent="center"> 
        <Button 
          variant="contained" 
          style={{
            backgroundColor: '#AF061B'
          }}
          size="large"
          onClick={() => navigate('/agendar')}
        >
          Solicitar hora medica
        </Button>
      </Grid>
    </Grid>
  )
}

export default Home