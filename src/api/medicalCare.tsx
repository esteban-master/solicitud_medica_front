import { useMutation, useQuery } from "react-query";
import { MedicalCare } from "../models/medicalCare";
import queryString from 'query-string'
import axios from './index'
import camelcaseKeys from 'camelcase-keys';

const useNextMedicalCare = (data: { date: Date, patientId?: number, healthProfessionalId?: number }) => {
  const stringified = queryString.stringify(data);
  return useQuery<MedicalCare>(['nextMedicalCare', data.patientId ? data.patientId : data.healthProfessionalId], async () => {
    const { data } = await axios.get(`next_medical_care?${stringified}`)
    return camelcaseKeys(data)
  })
}

type CreateMedicalCare = Pick<MedicalCare, 'healthProfessionalId' | 'patientId' | 'date'>
const createMedicalCare = async (medicalCare: CreateMedicalCare): Promise<MedicalCare> => {
  const { data } = await axios.post('/medical_care', medicalCare)
  return data
}
const useCreateMedicalCare = () => useMutation<MedicalCare, any, CreateMedicalCare>(createMedicalCare)


const cancelateMedicalCare = async (id: number): Promise<MedicalCare> => {
  const { data } = await axios.post(`/canceled_medical_care/${id}`)
  return data
}
const useCanceledMedicalCare = () => useMutation<MedicalCare, any, number>(cancelateMedicalCare)

const useHoursOfMedicalCareUsed = ({ id, startDate, endDate } : {id: number, startDate: Date, endDate: Date}) => useQuery<MedicalCare[]>(['hoursOfMedicalCareUsed', id], async () => {
  const stringified = queryString.stringify({ id, startDate, endDate });
  const { data } = await axios.get(`/medical_care_professional?${stringified}`)
  return camelcaseKeys(data)
})

export {
  useNextMedicalCare,
  useCreateMedicalCare,
  useHoursOfMedicalCareUsed,
  useCanceledMedicalCare
}