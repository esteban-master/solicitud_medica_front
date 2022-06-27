import { Avatar, Card, CardHeader, Grid } from "@mui/material"
import { FC } from "react";
import { useShedule } from "../../state/context/SheduleContext";
import { HealthProfessional } from "../../models/healthProfessional";

const ListProfessional: FC<{ data: HealthProfessional[] }> = props => {
  const { changeState } = useShedule();
  return (
    <Grid 
      container 
      spacing={1}
    >
      {
        props.data.map(item => 
          <Grid key={item.id} item xs={12} md={6}>
            <Card 
              onClick={() => changeState({ professional: item, activeStep: 1 })}
              style={{ cursor: 'pointer' }}
            >
              <CardHeader 
                avatar={<Avatar alt={item.name} src={item.photo} />}
                title={item.name}
                subheader={item.professionName}
              />
            </Card>
          </Grid>)
      }
    </Grid>
  )
}

export default ListProfessional