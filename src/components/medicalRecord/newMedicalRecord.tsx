import { Grid, Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from "@mui/material"
import NiceModal, { useModal } from '@ebay/nice-modal-react'

const NewMedicalRecord = NiceModal.create(({ patientId }) => {
  const modal = useModal()

  function handleClose() {
    modal.remove()
  }

  return (
    <Dialog
      open={modal.visible}
      onClose={handleClose}
    >
      <DialogTitle>
        Nuevo registro medico
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h4' component="h4">Poto</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => modal.remove()}>Crear</Button>
      </DialogActions>
    </Dialog>
  )
})


export default NewMedicalRecord