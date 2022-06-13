import { Button, Grid, Typography } from "@mui/material"
import ListDataUser from "../../components/home/ListDataUser"
import CurrentMedications from "../../components/home/CurrentMedications"
import LastDoctorsSeen from "../../components/home/LastDoctorsSeen"
import NiceModal from '@ebay/nice-modal-react';
import { useShedule } from "../../state/context/SheduleContext"
import { toast } from 'react-toastify';
import {  useHealthProfessional } from "../../api/healthProfessionals";
import { useAuth } from "../../state/context/auth";
import PatientData from "../../components/home/patientData";

const Home = () => {
 
  return (
    <Grid>
      <PatientData />
    </Grid>
  )
}

export default Home