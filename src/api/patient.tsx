import { useQuery } from "react-query";
import axios from './index'
import camelcaseKeys from 'camelcase-keys';
import { Patient } from "../models/Patient";

const usePatient = (uid: string | undefined) => {
  return useQuery<Patient>(['patient', uid], async () => {
    const { data } = await axios.get(`/patient/${uid}`)
    return camelcaseKeys(data);
  }, { enabled: !!uid })
}

export {
  usePatient
}