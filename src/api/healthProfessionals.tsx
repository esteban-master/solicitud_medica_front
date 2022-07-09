import { useQuery } from "react-query";
import { HealthProfessional } from "../models/healthProfessional";
import axios from './index'
import camelcaseKeys from 'camelcase-keys';
import { Entity } from "../models/entity";
import { MedicalCare } from "../models/medicalCare";
import { Patient } from "../models/Patient";

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

const usePatientsOfAProfessional = (profesionalId: number | undefined ) => {
  return useQuery<Entity[]>(['patients_for_professional', profesionalId], async () => {
    const { data } = await axios.get<Entity[]>(`health_professional/patients_for_professional/${profesionalId}`)

    return camelcaseKeys(data);
  }, { enabled: !!profesionalId })
}

export type UpcomingAppointment = { medicalCare: MedicalCare, patient: Patient }

const useUpcomingAppointments = (profesionalId: number | undefined ) => {
  return useQuery<UpcomingAppointment[]>(['upcomingAppointments', profesionalId], async () => {
    const { data } = await axios.get<UpcomingAppointment[]>(`health_professional/upcoming_appointments/${profesionalId}`)

    return camelcaseKeys(data);
  }, { enabled: !!profesionalId })
}

export {
  useHealthProfessionals,
  useHealthProfessional,
  useAllHealthProfessionals,
  usePatientsOfAProfessional,
  useUpcomingAppointments
}