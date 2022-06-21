import {  Grid, Typography } from "@mui/material"
import PatientData from "../../components/home/patientData";
import {  UserEntity } from "../../redux/auth/authSlice";
import { useAuth } from "../../redux/store";

const Professional = ({ data }: { data: UserEntity | null }) => {
  return (
    <Grid>
      <Typography>Bienvenido/a {data?.name}</Typography>
    </Grid>
  )
}

const Home = () => {
  const auth = useAuth()
  return (
    <Grid>
      {
        auth.user && auth.user.healthProfessionalId ? 
          <Professional data={auth.user} /> : 
          <PatientData data={auth.user}/>
      }
    </Grid>
  )
}

export default Home