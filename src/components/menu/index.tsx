import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routesItems } from '../../Routes';
import {
  Divider,
  Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

function Menu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
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
          {
            routesItems.filter(route => route.active).map(({ label, icon, route }) => (
              <ListItem key={label}>
                <ListItemButton
                  onClick={() => {
                    navigate(route);
                  }}
                >
                  <ListItemIcon>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemButton
              onClick={() => {
                console.log('Salir')
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar sesion" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                console.log('Login')
              }}
            >
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Iniciar sesion" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Stack>
  );
}

export default Menu;
