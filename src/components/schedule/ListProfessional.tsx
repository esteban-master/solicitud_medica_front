import { Avatar, Button, Card, CardActions, CardHeader, Divider, Grid, IconButton } from "@mui/material"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const listProfessional = [
  { name: 'Remy Sharp', profession: 'Medico general', id: 1, photo: 'https://mui.com/static/images/avatar/3.jpg' },
  { name: 'Remy Sharp', profession: 'Medico general', id: 2, photo: 'https://mui.com/static/images/avatar/3.jpg' },
  { name: 'Remy Sharp', profession: 'Medico general', id: 3, photo: 'https://mui.com/static/images/avatar/3.jpg' },
  { name: 'Remy Sharp', profession: 'Medico general', id: 4, photo: 'https://mui.com/static/images/avatar/3.jpg' },
  { name: 'Remy Sharp', profession: 'Medico general', id: 5, photo: 'https://mui.com/static/images/avatar/3.jpg' },
]

const ListProfessional = () => {
  return (
    <Grid item container xs={12} spacing={1}>
      {
        listProfessional.map(item => <Grid key={item.id} item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader 
              avatar={<Avatar alt={item.name} src={item.photo} />}
              title={item.name}
              subheader={item.profession}
              action={
                <IconButton aria-label="Agregar a favoritos">
                  <FavoriteBorderIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardActions>
              <Button startIcon={<CalendarMonthIcon />}>Agendar cita</Button>
            </CardActions>
          </Card>
        </Grid>)
      }
    </Grid>
  )
}

export default ListProfessional