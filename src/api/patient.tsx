import { useQuery } from "react-query";
import axios from './index'
import camelcaseKeys from 'camelcase-keys';
import queryString from 'query-string'
import { Patient } from "../models/Patient";

const usePatient = (uid: string | undefined) => {
  return useQuery<Patient>(['patient', uid], async () => {
    const { data } = await axios.get(`/patient/${uid}`)
    return camelcaseKeys(data);
  }, { enabled: !!uid })
}

const useMedicalRecords = (patientId: number | string | undefined, professionalId: number | string | undefined) => {
  const stringified = queryString.stringify({ patientId, professionalId });
  return useQuery<any>(['medicalRecords', patientId, professionalId], async () => {
    const { data } = await axios.get(`/medical_records?${stringified}`)
    return camelcaseKeys(data, { deep: true });
  },  { enabled: !!patientId && !!professionalId })
}

export {
  usePatient,
  useMedicalRecords
}