import { Entity } from "./entity";

export type Patient = Entity & {
  id: number;
  entityId: number;
}