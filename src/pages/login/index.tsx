import { Grid, Button, TextField, Typography, Stack } from "@mui/material"
import { useState } from "react";
import queryString from 'query-string'
import { toast } from "react-toastify";
const Login = () => {
  const [form, setForm] = useState({
    name: '',
    taxNumber: '',
    email: ''
  })


  function handleLogin() {
    const stringified = queryString.stringify(form);
    fetch(`http://localhost:3000/account_request?${stringified}`).then(res => res.json()).then(res => {
      toast.success('Solicitud realizada', { position: toast.POSITION.BOTTOM_CENTER })
    })
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
          Sistema desarrollado para adultos mayores que presentan enfermedades que les impiden la movilidad física y que les impiden asistir con normalidad a un hospital, donde podrían tener algún tipo de accidente al viajar.
        </Typography>
        <Typography variant="body1">
          El uso de este sistema de fácil acceso y uso podría ayudar a reducir los accidentes, junto con un trato más personalizado del profesional con el paciente, junto con la integración de los adultos mayores a la tecnología.
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography 
            variant="h2" 
            component="h2"
          >
            ¿No tienes una cuenta?
        </Typography>
        <Typography variant="body1">
          Si no tienes una cuenta, puedes realizar la solicitud con tu rut y correo.
        </Typography>
        <Typography variant="body1">
          Durante los próximos días se le enviará un correo electrónico con la cuenta creada si se encuentra dentro de los requisitos para utilizar este sistema.
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField 
          label="Nombre" 
          fullWidth
          type="text"
          variant="outlined" 
          onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value}))}
          />
      </Grid>
      <Grid item xs={12}>
        <TextField 
          label="Correo" 
          type="email"
          fullWidth
          variant="outlined" 
          onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value}))}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField 
          label="Rut" 
          fullWidth
          variant="outlined" 
          onChange={(e) => setForm(prev => ({ ...prev, tax_number: e.target.value}))}
          helperText="Rut debe tener este formato: 77777777"/>
      </Grid>
      <Grid item xs={12}>
        <Stack justifyContent="center">
          <Button 
            onClick={handleLogin} 
            variant="contained"
            size="large"
            >
              Solicitar
            </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Login