import { useQuery } from "react-query";
import { Profession } from "../models/Profession";
import axios from './index'

const useProfessions = () => {
  return useQuery<Profession[]>('professions', async () => {
    const { data } = await axios.get('profession')
    return data
  })
}

export {
  useProfessions
}