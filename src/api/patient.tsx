import { useQuery } from "react-query";
import axios from './index'
import camelcaseKeys from 'camelcase-keys';
import queryString from 'query-string'
import { Patient } from "../models/Patient";
import { MedicalRecord } from "../models/MedicalRecord";
import { Disease } from "../models/Disease";
import { HealthProfessional } from "../models/healthProfessional";

export type PatientMedicalRecord = {
  patient: Patient,
  lastMedicalRecord: MedicalRecord,
  medicalRecords: MedicalRecord[],
  diseases: Disease[]
} 

const useMedicalRecords = (patientId: number | string | undefined, professionalId: number | string | undefined) => {
  const stringified = queryString.stringify({ patientId, professionalId });
  return useQuery<PatientMedicalRecord>(['medicalRecords', patientId, professionalId], async () => {
    const { data } = await axios.get(`patient/medical_records?${stringified}`)
    return camelcaseKeys(data, { deep: true });
  })
}

export type LastHealthProfessionalsSeen = {
  [key: string]: {
    date: string;
    professional: HealthProfessional
  }[]
}


const useLastHealthProfessionalsSeen = (patientId: number | string | undefined) => {
  return useQuery<LastHealthProfessionalsSeen>(['lastHealthProfessionalsSeen', patientId], async () => {
    const { data } = await axios.get(`patient/last_professionals/${patientId}`)
    return camelcaseKeys(data, { deep: true });
  })
}

export {
  useMedicalRecords,
  useLastHealthProfessionalsSeen
}