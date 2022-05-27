import { Container, Grid, Link } from "@mui/material"

const Banner = ({ links }: { links: [string, string][] }) => {
  return (
    <Grid container sx={{
      backgroundColor: '#ED3232',
      padding: 2,
    }}>
      <Container maxWidth="lg">
        {
          links.map(([name, link]) => <Link 
            key={name}
            href={link} 
            style={{ 
              color: 'white',
              textDecorationColor: 'white' 
            }}>
          {name}
        </Link>)
        }
      </Container>
    </Grid>
  )
}

export default Banner