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
import { handleSignOut, signIn } from '../../firebase/firebaseConfig';
import { useAuth } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { loginAction, logoutAction, toggleLoading } from '../../redux/auth/authSlice';
import { useQueryClient } from 'react-query';
import axios from '../../api/index'
import camelcaseKeys from 'camelcase-keys';

function Menu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const auth = useAuth()
  const dispatch = useDispatch()

  const queryClient = useQueryClient()
  const [login, setLogin] = useState({
    email: 'esteban@gmail.com',
    password: 'holaEsteban'
  })

  function handleSubmit() {
    dispatch(toggleLoading())
    signIn({ email: login.email, password: login.password }, (user) => {
      queryClient.fetchQuery(['user', user.uid], async () => {
        const { data } = await axios.get(`/entities/${user.uid}`)
        return camelcaseKeys(data, { deep: true });
      }).then(data => {
        dispatch(loginAction({
          uid: user.uid,
          ...data.entity,
          info: data.info
        }))
        navigate('/inicio')
      })
    });
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
            auth.logged && 
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
          
          { auth.logged ? 
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
                  handleSignOut(() => {
                    dispatch(logoutAction())
                  });
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
                  { auth.isLoading ? 'Ingresando...' : 'Entrar' }
                </Button>
              </ListItem>
            </> }
        </List>
      </Drawer>
    </Stack>
  );
}

export default Menu;
