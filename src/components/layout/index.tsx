import { Container, Stack } from "@mui/material"
import { Outlet } from "react-router-dom"
import Banner from "../banner"
import Header from "../header"

const Layout= () => {
  return (
    <Stack>
      <Header />
      <Banner links={[['¿Que requisitos son nesesarios para postular a este programa?', '/info/que-requisitos-son-nesesarios-para-postular-a-este-programa']]}/>
      <Stack marginY={3}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Stack>
   </Stack>
  )
}

export default Layout