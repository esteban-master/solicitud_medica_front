import { Button, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  return (
    <Stack direction="row" spacing={2} justifyContent="space-between" padding={2}>
      <img 
        onClick={() => navigate('/inicio')}
        src={`${process.env.PUBLIC_URL}/logo-cha-1.png`} 
        alt="Logo salud" 
      />
      <Button variant="outlined">FICHA CLINICA</Button>
    </Stack>
  )
}

export default Header