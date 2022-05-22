import { useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Stack, Typography } from "@mui/material";

type Day = 'today' | 'tomorrow'

const ListDates = ({ day, dates, handleClickDate }: { day: Day, dates: any[], handleClickDate: (item: {day: Day, date: any}) => void}) => {
  return <Stack spacing={1}>
    {
      dates.map(date => (
        <Button
          key={date} 
          style={{
            backgroundColor: '#E5F1FF',
            color: '#004E9C',
            fontWeight: 'bold'
          }} 
          variant="text"
          onClick={() => handleClickDate({ day, date})}
        >
          {date}
        </Button>
      ))
    }
  </Stack>
}

const dates = [
  '10:00',
  '11:30',
  '13:00',
  '16:00',
  '17:30',
]

export const ScheduleModal = NiceModal.create(({ professional, user }) => {
  const [selectedDate, setSelectedDate] = useState<any>(null)
  const modal = useModal()
  
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
        <DialogContentText>
          Seleccione un horario entre el dia de hoy y manana.
        </DialogContentText>
        <Grid container marginY={2}>
          <Grid item xs={6}>
            <Stack direction="column" alignItems="center">
              <Stack>
                <Typography variant="body1" component="p" style={{ fontWeight: 'bold'}}>Hoy</Typography>
                <Typography variant="body2" component="p">22 Mayo</Typography>
              </Stack>
              <ListDates day='today' dates={dates} handleClickDate={item => setSelectedDate(item)} />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="column" alignItems="center">
              <Stack>
                <Typography variant="body1" component="p" style={{ fontWeight: 'bold'}}>Mañana</Typography>
                <Typography variant="body2" component="p">23 Mayo</Typography>
              </Stack>
              <ListDates day='tomorrow' dates={dates} handleClickDate={item => setSelectedDate(item)}/>
            </Stack>
          </Grid>
          
        </Grid>

        {
          selectedDate && <Paper elevation={3}>
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
                    <Typography>{selectedDate.day === 'today' ? 'Hoy' : 'Mañana'} a las {selectedDate.date} hrs.</Typography>
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
        }
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
          disabled={!selectedDate}
          onClick={() => {
            modal.resolve({ ok: true })
            modal.remove();
          }}
        >
          Solicitar
        </Button>
      </DialogActions>
    </Dialog>
  )
});