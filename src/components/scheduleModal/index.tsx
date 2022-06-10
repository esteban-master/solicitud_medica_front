import { Grid, Dialog, DialogTitle, Stepper, Step, StepLabel, DialogContent, Button, StepContent } from "@mui/material"
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useShedule } from "../../state/context/SheduleContext";
import { StepTwo } from "./StepTwo";
import { useCreateMedicalCare } from '../../api/medicalCare';
import { toast } from 'react-toastify';
import StepOne from './StepOne';
import StepThree from './StepThree';

const steps = [
  {label: 'Seleccionar Medico', component: <StepOne />}, 
  {label: 'Selecionar fecha', component: <StepTwo />}, 
  {label: 'Confirmacion', component: <StepThree /> }];

const ScheduleModal = NiceModal.create(() => {
  const { state: { activeStep }, state ,changeState } = useShedule()
  const modal = useModal()

  const createMedicalCareMutation = useCreateMedicalCare()

  const handleBack = () => {
    changeState({ activeStep: activeStep - 1 })
  };

  const handleSubmit = () => {
    const toastId = toast.loading("Creando cita...", { position: toast.POSITION.BOTTOM_CENTER })
    createMedicalCareMutation.mutate({ 
      date: state.date, 
      patientId: 23, 
      healthProfessionalId: state.professional.id 
    }, {
      onSuccess: (data, variables, context) => {
        modal.resolve({ data, toastId });
        changeState({ professionalFilter: 0, activeStep: 0, professional: '' })
        modal.remove()
      }
    })
    
  }

  function handleClose() {
    changeState({ professionalFilter: 0, activeStep: 0, professional: '' })
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
          <Grid item xs={12}>
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
                    disabled={createMedicalCareMutation.isLoading}
                    onClick={handleSubmit}
                  >
                    {createMedicalCareMutation.isLoading ? 'Creando...' : 'Enviar'}
                  </Button>
              )
            }
          </Grid>
        </Grid>

      </DialogContent>
      
      <DialogContent>
        <Button 
          disabled={activeStep === 0}  
          variant="outlined" 
          onClick={handleBack}>
            Atras
        </Button>
      </DialogContent>
    </Dialog>
  )
})


export default ScheduleModal