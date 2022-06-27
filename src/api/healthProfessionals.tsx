import { useQuery } from "react-query";
import { HealthProfessional } from "../models/healthProfessional";
import axios from './index'
import camelcaseKeys from 'camelcase-keys';
import { Entity } from "../models/entity";

const useHealthProfessionals = (professionId: number | undefined) => {
  return useQuery<HealthProfessional[]>('healthProfessionals', async () => {
    const { data } = await axios.get(`/health_professional?professionId=${professionId}`)
    return camelcaseKeys(data);
  }, { enabled: !!professionId })
}

const useHealthProfessional = (uid: string | undefined) => {
  return useQuery<HealthProfessional>(['healthProfessional', uid], async () => {
    const { data } = await axios.get(`/health_professional/${uid}`)
    return camelcaseKeys(data);
  }, { enabled: !!uid })
}

const useAllHealthProfessionals = () => {
  return useQuery<HealthProfessional[]>('healthProfessionals', async () => {
    const { data } = await axios.get(`/health_professional`)
    return camelcaseKeys(data);
  })
}


export type PatientsOfAProfessional = {
  id:                     number;
  patientId:             number;
  patientName:           string;
  patientAddress:        string;
  patientPhone:          string;
  patientTaxNumber:      string;
  createdAt:             Date;
  updatedAt:             Date;
  healthProfessionalId: number;
  attended:               boolean;
  date:                   Date;
  canceled:               boolean;
}


const usePatientsOfAProfessional = (profesionalId: number | undefined ) => {
  return useQuery<Entity[]>(['patients_for_professional', profesionalId], async () => {
    const { data } = await axios.get<Entity[]>(`health_professional/patients_for_professional/${profesionalId}`)

    return camelcaseKeys(data);
  }, { enabled: !!profesionalId })
}

export {
  useHealthProfessionals,
  useHealthProfessional,
  useAllHealthProfessionals,
  usePatientsOfAProfessional
}