import { useQuery } from "react-query";
import { HealthProfessional } from "../models/healthProfessional";
import axios from './index'
import camelcaseKeys from 'camelcase-keys';


const useHealthProfessionals = (id: number) => {
  console.log("ID: ", id, !!id)
  return useQuery<HealthProfessional[]>('healthProfessionals', async () => {
    const { data } = await axios.get(`/health_professional?id=${id}`)
    return camelcaseKeys(data);
  }, { enabled: !!id })
}

export {
  useHealthProfessionals
}