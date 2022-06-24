import {  Grid } from "@mui/material"
import PatientData from "../../components/home/patientData";
import { useAuth } from "../../redux/store";
import Professional from "../professional";


const Home = () => {
  const auth = useAuth()
  return (
    <Grid>
      {
        auth.user && auth.user.healthProfessionalId ? 
          <Professional /> : 
          <PatientData data={auth.user}/>
      }
    </Grid>
  )
}

export default Home