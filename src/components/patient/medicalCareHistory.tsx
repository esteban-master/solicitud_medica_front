import { ListItemText, ListItem, DialogTitle, Dialog, DialogContent, DialogActions, Button, Typography, Grid, ListItemAvatar, Avatar } from "@mui/material"
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { formatDate } from "../../utils/formatDate";
import { FixedSizeList } from 'react-window';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const MedicalCareHistory = NiceModal.create<{dates: string[], professional: any}>(({ dates, professional }) => {
  const modal = useModal()
  return (
    <Dialog open={modal.visible} onClose={() => modal.remove()}>
      <DialogTitle>Historial de citas</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">Has tenido {dates.length} {`${dates.length === 1 ? 'cita' : 'citas'}`} con { professional.name } ({professional.professionName}), desde el <strong>{ formatDate(dates[dates.length -1], "eeee dd 'de' MMMM 'del' yyyy") }</strong>.</Typography>
          </Grid>

          <Grid item xs={12}>
            <FixedSizeList 
              itemData={dates}
              itemCount={dates.length}  
              itemSize={50}
              height={200}
              width={"100%"}
              overscanCount={3}
            >
            {({ data, index, style }) => 
              <ListItem style={style} key={index}>
                <ListItemAvatar>
                  <Avatar>
                    <CalendarMonthIcon />
                  </Avatar>
                  </ListItemAvatar>
                <ListItemText primary={formatDate(data[index], "'El' eee dd 'de' MMM yyyy")} secondary={formatDate(data[index], "'A las ' HH:mm 'hrs.'")} />
              </ListItem>}
            </FixedSizeList>
          </Grid>
        </Grid>
      
        
      </DialogContent>
      <DialogActions>
        <Button onClick={() => modal.remove()}>Aceptar</Button>
      </DialogActions>
    </Dialog>
  )
})


export default MedicalCareHistory