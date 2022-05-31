import React from 'react';
import { Grid, Typography, Autocomplete, TextField, Dialog, DialogTitle, Stepper, Step, StepLabel, DialogContent, Button, Paper, StepContent } from "@mui/material"
import ListProfessional from "./ListProfessional"
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import esLocale from 'date-fns/locale/es'
import format from 'date-fns/format'
import { useShedule } from "../../state/context/SheduleContext";
import { StepTwo } from "./StepTwo";


const professions = [
  { label: 'Oftalmologo', id: 1}, 
  { label: 'Urologo', id: 2}, 
  { label: 'Medico general', id: 3}, 
  { label: 'Psicologo', id: 4}, 
  { label: 'Nutricionista', id: 5},
  { label: 'Traumatologo', id: 6}
]

const StepOne = () => {
  const { state ,changeState } = useShedule();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Autocomplete
          onChange={(_, item) => changeState({ professionalFilter: item?.id })}
          disablePortal
          options={professions}
          renderInput={(params) => <TextField {...params} label="Profesional" />}
        />
      </Grid>
      {
        !state.professionalFilter ? (
          <Grid item>
            <Typography variant="h2" component="h2">Selecione un profesional</Typography>
          </Grid>
        ) : (
         <React.Fragment>
            <Grid item>
            <Typography variant="h2" component="h2">5 resultados para {professions.find(item => item.id.toString() === state.professionalFilter.toString())?.label}</Typography>
            </Grid>
            <Grid item>
              <ListProfessional />   
            </Grid>
         </React.Fragment>
        )
      }
    </Grid>
  )
}

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

const steps = [
  {label: 'Seleccionar Medico', component: <StepOne />}, 
  {label: 'Selecionar fecha', component: <StepTwo />}, 
  {label: 'Confirmacion', component: <StepThree /> }];



const ScheduleModal = NiceModal.create(() => {
  const { state: { activeStep } ,changeState } = useShedule()
  const modal = useModal()

  const handleBack = () => {
    changeState({ activeStep: activeStep - 1 })
  };

  const handleSubmit = () => {
    modal.resolve({ resolved: true });
    modal.remove()
  }

  function handleClose() {
    modal.remove()
  }

  return (
    <Dialog
      open={modal.visible}
      onClose={handleClose}
    >
      <DialogTitle>Solicitud atencion domiciliaria</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item>
              <Stepper activeStep={activeStep} orientation="vertical">
              {
                steps.map(step => (
                  <Step key={step.label}>
                    <StepLabel>{step.label}</StepLabel>
                    <StepContent>
                      { step.component }
                    </StepContent>
                  </Step>
                ))
              }
            </Stepper>
          </Grid>
          <Grid item container>
            {
              activeStep === steps.length - 1 && (
                <Button 
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Enviar
                  </Button>
              )
            }
          </Grid>
        </Grid>

      </DialogContent>
      
      <DialogContent>
        <Button disabled={activeStep === 0}  variant="outlined" onClick={handleBack}>Atras</Button>
      </DialogContent>
    </Dialog>
  )
})


export default ScheduleModal