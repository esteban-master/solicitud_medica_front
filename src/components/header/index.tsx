import { Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Menu from '../menu';

function Header() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg">
      <Stack direction="row" spacing={2} justifyContent="space-between" padding={2}>
        <img
          onClick={() => navigate('/inicio')}
          src={`${process.env.PUBLIC_URL}/logo-cha-1.png`}
          alt="Logo salud"
        />
        <Menu />
      </Stack>
    </Container>
  );
}

export default Header;
