import { Grid, Dialog, DialogTitle, DialogContent, Button, DialogActions } from "@mui/material"
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import ProfessionsList from "../professionsList"

const AddProfessionalDialog = NiceModal.create(() => {
  const modal = useModal()
  const handleSubmit = () => {
    
  }

  function handleClose() {
    modal.remove()
  }

  return (
    <Dialog
      open={modal.visible}
      onClose={handleClose}
    >
      <DialogTitle>Crear nuevo profesional</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* <ProfessionsList value={} changeState={} /> */}
          </Grid>
        </Grid>

      </DialogContent>

      <DialogActions>
          <Button onClick={handleClose}>Crear</Button>
      </DialogActions>
    </Dialog>
  )
})


export default AddProfessionalDialog