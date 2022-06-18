import { useQuery } from "react-query";
import { Entity } from "../models/entity";
import axios from './index'
import camelcaseKeys from 'camelcase-keys';

export type Info = {
  entityId: number;
  createdAt: Date;
  updatedAt: Date;
  professionId?: number; 
}

export type EntityResponse = { entity: Entity, info: Info }

const useEntity = (uid: string | undefined) => {
  return useQuery<EntityResponse>(['user', uid], async () => {
    const { data } = await axios.get(`/entities/${uid}`)
    return camelcaseKeys(data, { deep: true });
  }, { enabled: !!uid })
}



export {
  useEntity,
}