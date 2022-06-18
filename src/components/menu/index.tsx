import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import {
  Button,
  Divider,
  Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, TextField
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import EventIcon from '@mui/icons-material/Event';
import { useAuth } from '../../state/context/auth';

function Menu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { state, signIn, signOut } = useAuth()

  const [login, setLogin] = useState({
    email: 'esteban@gmail.com',
    password: 'holaEsteban'
  })

  function handleSubmit() {
    signIn({ email: login.email, password: login.password });
  }
  
  return (
    <Stack>
      <IconButton
        onClick={() => setOpen((prev) => !prev)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate('/inicio');
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Inicio' />
            </ListItemButton>
          </ListItem>
          {
            state.user && 
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText primary="Solicitar hora medica"/>
              </ListItemButton>
            </ListItem>
          }
        </List>
        <Divider />
        <List>
          
          { state.user ? 
          <>
            <ListItem>
              <ListItemButton
                onClick={() => {
                  navigate('/profesional')
                }}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profesional" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => {
                  signOut();
                }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Cerrar sesion" />
              </ListItemButton>
            </ListItem>
          </> : 
            <>
              <ListItem>
                <TextField label="Correo" variant="outlined" type="email" value={login.email} onChange={event => setLogin(prev => ({ ...prev, email: event.target.value }))}/>
              </ListItem>
              <ListItem>
                <TextField label="Contraseña" variant="outlined" type="password" value={login.password} onChange={event => setLogin(prev => ({ ...prev, password: event.target.value}))}/>
              </ListItem>
              <ListItem>
                <Button fullWidth variant="contained" onClick={handleSubmit}>
                  { state.isLoading ? 'Ingresando...' : 'Entrar' }
                </Button>
              </ListItem>
            </> }
        </List>
      </Drawer>
    </Stack>
  );
}

export default Menu;
