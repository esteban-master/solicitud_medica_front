import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import { Disease } from '../../models/Disease'

const Diseases = ({ diseases }: {diseases: Disease[]}) => {
  return (
    <Grid item xs={12}>
      <Typography variant='h2' component="h2">Antecedentes mórbidos</Typography>
      
      <List>
        {diseases.map(item => <ListItem key={item.id}>
          <ListItemText
            primary={item.name}
          />
        </ListItem>)}
      </List>
    </Grid>
  )
}

export default Diseases