import { Grid, Button, TextField, Typography, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  function handleLogin() {
    navigate("/inicio")
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography 
          variant="h1" 
          component="h1"
        >
          Programa adulto mayor dependiente
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui a odit quibusdam! Ipsam facilis nobis nihil, voluptatum alias obcaecati. Quasi blanditiis assumenda illo nisi quisquam similique quam, voluptate pariatur expedita.
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui a odit quibusdam! Ipsam facilis nobis nihil, voluptatum alias obcaecati. Quasi blanditiis assumenda illo nisi quisquam similique quam, voluptate pariatur expedita.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField 
          label="Rut" 
          fullWidth
          variant="outlined" 
          helperText="Rut debe tener este formato: 7777777-7"/>
      </Grid>
      <Grid item xs={12}>
        <Stack justifyContent="center">
          <Button 
            onClick={handleLogin} 
            variant="contained"
            size="large"
            >
              Ingresar
            </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Login