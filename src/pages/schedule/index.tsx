import { Grid, Typography, Autocomplete, TextField } from "@mui/material"
import ListProfessional from "../../components/schedule/ListProfessional"

const professions = [
  { label: 'Oftalmologo', id: 1}, 
  { label: 'Urologo', id: 2}, 
  { label: 'Medico general', id: 3}, 
  { label: 'Psicologo', id: 4}, 
  { label: 'Nutricionista', id: 5},
  { label: 'Traumatologo', id: 6}
]

const Schedule = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography
            variant="h1" 
            component="h1"
          >
            Seleccionar profesional
          </Typography>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          onChange={(item, item2) => console.log({item, item2})}
          value={professions[2]}
          disablePortal
          id="combo-box-demo"
          options={professions}
          renderInput={(params) => <TextField {...params} label="Profesional" />}
        />
      </Grid>
      <Grid item>
        <Typography variant="h2" component="h2">5 resultados para Medico general</Typography>
      </Grid>
      <ListProfessional />

      
    </Grid>
  )
}

export default Schedule