import { CircularProgress, Grid, Typography } from "@mui/material"
import { Fragment } from "react";
import { EntityResponse, useEntity } from "../../api/entity";
import PatientData from "../../components/home/patientData";
import { useAuth } from "../../state/context/auth";

const Professional = ({ data }: { data: EntityResponse }) => {

  return (
    <Grid>
      <Typography>Bienvenido/a {data.entity.name}</Typography>
    </Grid>
  )
}

const Home = () => {
  const auth = useAuth()
  const uid = auth.state.user?.uid;
  const entity = useEntity(uid)

  if(entity.isLoading) {
    return <CircularProgress />
  }

  console.log({ data: entity.data })
  return (
    <Grid>
      {
        entity.isSuccess && (
          <>
            { entity.data.entity.healthProfessionalId && <Professional data={entity.data}/> }
            { entity.data.entity.patient_id && <PatientData data={entity.data}/> }
          </>
        )
      }
    </Grid>
  )
}

export default Home