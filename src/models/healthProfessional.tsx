import { Entity } from "./entity";

export type HealthProfessional = Entity & {
  id:              number;
  professionName: string;
  entityId:       number;
  professionId:   number;
}