import { useMutation, useQuery } from "react-query";
import { MedicalCare } from "../models/medicalCare";
import queryString from 'query-string'
import axios from './index'
import camelcaseKeys from 'camelcase-keys';
import { AxiosResponse } from "axios";

const useMedicalCares = () => {
  return useQuery<MedicalCare[]>('medicalcares', async () => {
    const { data } = await axios.get('/medical_care')
    return camelcaseKeys(data)
  })
}

type CreateMedicalCare = Pick<MedicalCare, 'healthProfessionalId' | 'patientId' | 'date'>
const createMedicalCare = async (medicalCare: CreateMedicalCare): Promise<MedicalCare> => {
  return await axios.post('/medical_care', medicalCare)
}
const useCreateMedicalCare = () => useMutation<MedicalCare, any, CreateMedicalCare>(createMedicalCare)

const useHoursOfMedicalCareUsed = ({ id, startDate, endDate } : {id: number, startDate: Date, endDate: Date}) => useQuery<MedicalCare[]>(['hoursOfMedicalCareUsed', id], async () => {
  const stringified = queryString.stringify({ id, startDate, endDate });
  const { data } = await axios.get(`/medical_care_professional?${stringified}`)
  return camelcaseKeys(data)
})

export {
  useMedicalCares,
  useCreateMedicalCare,
  useHoursOfMedicalCareUsed
}