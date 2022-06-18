import { Button, CircularProgress, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NiceModal from '@ebay/nice-modal-react';
import { useAllHealthProfessionals } from "../../api/healthProfessionals"
import { useShedule } from "../../state/context/SheduleContext"

const Professional = () => {
  const allHealthProfessionals =  useAllHealthProfessionals()
  const { state, changeState } = useShedule()
  function handleDelete() {
    console.log("DETELE")
  }
  return (
    <Grid container spacing={3}>
       <Grid item xs={12}>
        <Typography variant="h1" component="h1">Administracion</Typography>
       </Grid>
       
       <Grid item container xs={12} spacing={3}>
          <Grid item container xs={12}>
            <Grid item xs={12}>
             <Stack direction="row" spacing={3}>
              <Typography variant="h2" component="h2">Profesionales</Typography>
              <Button 
                onClick={() => {
                  NiceModal.show('addProfesionalModal')  
                }}
                variant="contained">
                Agregar nuevo profesional
              </Button>
             </Stack>
            </Grid>
            { !allHealthProfessionals.isLoading && allHealthProfessionals.isSuccess ? 
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Profesion</TableCell>
                        <TableCell>Fecha Ingreso</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Fernanda</TableCell>
                        <TableCell>Carabinera</TableCell>
                        <TableCell>12 de agosto, 2020</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={e => changeState({ openMenuEdit: true, anchorEl: e.currentTarget })}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            id="basic-menu"
                            anchorEl={state.anchorEl}
                            open={state.openMenuEdit}
                            onClose={() => changeState({ openMenuEdit: false, anchorEl: null })}
                            MenuListProps={{
                              'aria-labelledby': 'basic-button',
                            }}
                          >
                            <MenuItem onClick={() => changeState({ profesionalEditId: 1 })}>
                              <ListItemIcon>
                                <EditIcon />
                              </ListItemIcon>
                              <ListItemText>
                                Editar
                              </ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleDelete}>
                            <ListItemIcon>
                                <DeleteIcon />
                              </ListItemIcon>
                              <ListItemText>
                                Borrar
                              </ListItemText>
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid> : 
              <CircularProgress />}
          </Grid>
       </Grid>
    </Grid>
  )
}

export default Professional