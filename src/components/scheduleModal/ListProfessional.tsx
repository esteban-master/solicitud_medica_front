import { Avatar, Button, Card, CardActions, CardHeader, Divider, Grid } from "@mui/material"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NiceModal from '@ebay/nice-modal-react';
import { FC, Fragment } from "react";
import { useShedule } from "../../state/context/SheduleContext";
import { HealthProfessional } from "../../models/healthProfessional";


const ListProfessional: FC<{ withButton?: boolean, data: HealthProfessional[] }> = props => {
  const { changeState } = useShedule();
  return (
    <Grid 
      style={{
        overflow: 'auto',
        maxHeight: 350,
      }}  
      item
      container 
      xs={12} 
      spacing={1}
    >
      {
        props.data.map(item => <Grid key={item.id} item xs={12} md={6}>
          <Card 
            onClick={() => changeState({ professional: item, activeStep: 1 })}
            style={{ cursor: 'pointer' }}
          >
            <CardHeader 
              avatar={<Avatar alt={item.name} src={item.photo} />}
              title={item.name}
              subheader={item.professionName}
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
                            console.log({res})
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
          </Card>
        </Grid>)
      }
    </Grid>
  )
}

export default ListProfessional