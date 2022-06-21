import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material'

const Diseases = ({ diseases }: {diseases: {name: string, id: string}[]}) => {
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