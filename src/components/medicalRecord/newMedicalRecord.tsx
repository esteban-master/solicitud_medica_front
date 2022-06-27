import { Grid, Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button, TextField, Autocomplete, CircularProgress, Box, List, ListItem, ListItemText, IconButton } from "@mui/material"
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import axios from '../../api'
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from "../../redux/store"
import { toast } from 'react-toastify';

const NewMedicalRecord = NiceModal.create(({ patientId,  }) => {
  const modal = useModal()
  const auth = useAuth()
  const queryClient = useQueryClient()

  const medicines = useQuery<{ name: string, id: number }[]>('medicines', async () => {
    const { data } = await axios.get('medicine')
    return data
  })

  const createMedicalRecord = useMutation(async (newMedicalRecord): Promise<any> => {
    const { data } = await axios.post('/medical_record', newMedicalRecord)
    return data
  })

  const [disease, setDisease] = useState<any>(null)
  const [form, setForm] = useState<any>({
    medicinesSelected: [],
    observations: '',
    startDate: '',
    endDate: '',
  })

  function handleClose() {
    modal.remove()
  }

  function handleSubmit() {
    createMedicalRecord.mutate({...form, patientId, healthProfessionalId: auth.user?.healthProfessionalId }, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['medicalRecords', patientId, auth.user?.healthProfessionalId])
        toast.success('Registro agregado correctamente', { position: toast.POSITION.BOTTOM_CENTER })
        modal.remove()
      }
    })
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
            <Typography variant='h4' component="h4">Medicamentos</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>Desde</Typography>
            <TextField
              value={form.startDate}
              type="date"
              fullWidth
              onChange={e => setForm((prev: any) => ({ ...prev, startDate: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>Hasta</Typography>
            <TextField
              value={form.endDate}
              type="date"
              fullWidth
              onChange={e => setForm((prev: any) => ({ ...prev, endDate: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12}>
            {medicines.isSuccess && medicines.data ? 
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Autocomplete
                      onChange={(_, item) => setDisease(item)}
                      disablePortal
                      fullWidth
                      value={disease}
                      options={medicines.data.map(item=> ({ label: item.name, id: item.id }))}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={(params) => <TextField {...params} label="Medicamentos" />}
                      renderOption={(props, option) => <Box component="li" {...props}>{ form.medicinesSelected.find((item: any) => item.id === option.id) ? <>
                        <CheckCircleIcon color="success" /> {'  '} {option.label}
                      </> : option.label }  </Box>}
                    />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    startIcon={<AddIcon />}
                    disabled={!disease}
                    onClick={() => {
                      setForm((prev: any) => ({ ...prev, medicinesSelected: prev.medicinesSelected.find((item: any) => item.id === disease.id) ? prev.medicinesSelected : prev.medicinesSelected.concat(disease)}))
                      setDisease(null)
                    }}
                  >
                    Agregar
                  </Button>
                </Grid>
              </Grid> : <CircularProgress /> }
          </Grid>

          {
            form.medicinesSelected.length > 0 ? <Grid item xs={12}>
            <Typography variant="h4">Medicamentos agregados</Typography>
              <List>
                {form.medicinesSelected.map((item: any, index: number) => 
                  <ListItem 
                    key={item.id}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => setForm((prev: any) => ({ ...prev, medicinesSelected: prev.medicinesSelected.filter((ds: any) => ds.id !== item.id)}))}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={`${index + 1}. ${item.label}`} />
                  </ListItem>)}
              </List>
            </Grid> : null
          }

          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Observaciones"
              multiline
              fullWidth
              value={form.observations}
              rows={4}
              onChange={e => setForm((prev: any) => ({ ...prev, observations: e.target.value }))}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={() => modal.remove()}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>Crear</Button>
      </DialogActions>
    </Dialog>
  )
})


export default NewMedicalRecord