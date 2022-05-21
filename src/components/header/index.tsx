import { Button, Stack } from "@mui/material"

const Header = () => {
  return (
    <Stack direction="row" spacing={2} justifyContent="space-between" padding={2}>
      <img 
          src={`${process.env.PUBLIC_URL}/logo-cha-1.png`} 
          alt="Logo salud" 
        />
      <Button variant="outlined">FICHA CLINICA</Button>
    </Stack>
  )
}

export default Header