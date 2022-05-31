import { Alert, Avatar, Button, Card, CardActions, CardHeader, Divider, Grid, Snackbar } from "@mui/material"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NiceModal from '@ebay/nice-modal-react';
import { FC, Fragment, useState } from "react";
import { useShedule } from "../../state/context/SheduleContext";

const listProfessional = [
  { name: 'Remy Sharp', profession: 'Medico general', id: 1, photo: 'https://mui.com/static/images/avatar/3.jpg' },
  { name: 'Remy Sharp', profession: 'Medico general', id: 2, photo: 'https://mui.com/static/images/avatar/3.jpg' },
  { name: 'Remy Sharp', profession: 'Medico general', id: 3, photo: 'https://mui.com/static/images/avatar/3.jpg' },
  { name: 'Remy Sharp', profession: 'Medico general', id: 4, photo: 'https://mui.com/static/images/avatar/3.jpg' }
]

const ListProfessional: FC<{ withButton?: boolean }> = props => {
  const { changeState } = useShedule()
  const [successRequest, setSuccessRequest] = useState({open: false, message: ''})
  return (
    <Grid 
      style={{
        overflow: 'auto',
        maxHeight: 350,
      }}  
      container 
      xs={12} 
      spacing={1}
    >
      {
        listProfessional.map(item => <Grid key={item.id} item xs={12} md={6}>
          <Card 
            onClick={() => changeState({ professional: item, activeStep: 1 })}
            style={{ cursor: 'pointer' }}
          >
            <CardHeader 
              avatar={<Avatar alt={item.name} src={item.photo} />}
              title={item.name}
              subheader={item.profession}
            />

            {
              props.withButton && (
                <Fragment>
                  <Divider />
            
                  <CardActions>
                    <Button 
                      onClick={() => {
                        changeState({ professional: item, activeStep: 1 })
                        NiceModal
                          .show('scheduleModal')
                          .then(res => {
                            setSuccessRequest({ open: true, message: 'Solicitud creada exitosamente' })
                          })
                      }}  
                      startIcon={<CalendarMonthIcon />}
                    >
                      Agendar cita
                    </Button>
                  </CardActions>
                </Fragment>
              )
            }

            <Snackbar
              autoHideDuration={2000}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              open={successRequest.open}
              onClose={() => setSuccessRequest(prev => ({...prev, open: false}))}
              message={successRequest.message}
            >
              <Alert onClose={() => setSuccessRequest(prev => ({...prev, open: false}))} severity="success" sx={{ width: '100%' }}>
                {successRequest.message}
              </Alert>
            </Snackbar>
          </Card>
        </Grid>)
      }
    </Grid>
  )
}

export default ListProfessional