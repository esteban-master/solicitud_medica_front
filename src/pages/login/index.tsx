import { Grid, Button, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  function handleLogin() {
    navigate("/home")
  }

  return (
    <Grid container spacing={2}>
      <Grid item justifyContent="center" xs={12}>
        <TextField 
          label="Rut" 
          variant="outlined" 
          helperText="Rut debe tener este formato: 7777777-7"/>
      </Grid>
      <Grid item xs={6}>
        <Button onClick={handleLogin} variant="contained">Ingresar</Button>
      </Grid>
    </Grid>
  )
}

export default Login