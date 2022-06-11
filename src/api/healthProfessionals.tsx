import { useQuery } from "react-query";
import { HealthProfessional } from "../models/healthProfessional";
import axios from './index'
import camelcaseKeys from 'camelcase-keys';


const useHealthProfessionals = (professionId: number | undefined) => {
  return useQuery<HealthProfessional[]>('healthProfessionals', async () => {
    const { data } = await axios.get(`/health_professional?professionId=${professionId}`)
    return camelcaseKeys(data);
  }, { enabled: !!professionId })
}

export {
  useHealthProfessionals
}