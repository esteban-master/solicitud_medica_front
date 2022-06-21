import { Grid, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, DialogActions, Button } from "@mui/material"
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import MedicationIcon from '@mui/icons-material/Medication';
import esLocale from 'date-fns/locale/es'
import format from 'date-fns/format'

const MedicalRecordInfo = NiceModal.create<{medicalRecord: any}>(({ medicalRecord }) => {
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
        Información
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h4' component="h4">Observaciones</Typography>
            <Typography variant="body1" component="p">
              { medicalRecord.observations }
            </Typography>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <Typography variant='h4' component="h4">Medicamentos</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" component="p">
                Los medicamentos fueron recetados para el rango de fechas desde el día <strong>{ format(new Date(medicalRecord.startDate), "EEEE dd 'de' MMMM", { locale: esLocale }) }</strong> hasta el día <strong>{ format(new Date(medicalRecord.endDate), "EEEE dd 'de' MMMM", { locale: esLocale }) }</strong>.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <List>
                { medicalRecord.medicineLines.map((item: any) => 
                  <ListItem key={item.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <MedicationIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.name} secondary={`${item.dose} (${item.management})`}/>
                  </ListItem>) }
              </List>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => modal.remove()}>Aceptar</Button>
      </DialogActions>
    </Dialog>
  )
})


export default MedicalRecordInfo