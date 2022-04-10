import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export const SolicitudDialog = NiceModal.create<{ title: string }>(({ title }) => {
  const modal = useModal()
  
  function handleClose() {
    modal.remove()
  }
  
  return (
    <Dialog 
      open={modal.visible}
      onClose={handleClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima qui ab consequuntur nulla voluptate et illo debitis, deleniti officiis vel totam
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose} 
          variant="contained" 
          color="error"
        >
          Cancelar
        </Button>
        <Button 
          variant="contained" 
          color="success"
        >
          Solicitar
        </Button>
      </DialogActions>
    </Dialog>
  )
});