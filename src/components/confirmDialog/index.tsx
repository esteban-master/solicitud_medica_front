import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import NiceModal, { useModal } from '@ebay/nice-modal-react'

const ConfirmDialog = NiceModal.create<{ message: string, title: string }>(({ message, title }) => {
  const modal = useModal()

  function handleClose() {
    modal.remove()
  }

  function handleSubmit() {
    modal.resolve()
    modal.remove()
  }

  return (
    <Dialog
        open={modal.visible}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { title }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { message }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
  )
})

export default ConfirmDialog