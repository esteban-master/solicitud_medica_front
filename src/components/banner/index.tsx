import { Link, Stack } from "@mui/material"

const Banner = ({ links }: { links: [string, string][] }) => {
  return (
    <Stack sx={{
      backgroundColor: '#ED3232',
      padding: 2,
    }}>
      <Stack>
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
      </Stack>
    </Stack>
  )
}

export default Banner