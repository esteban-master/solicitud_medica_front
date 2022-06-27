import { MedicineLine } from "./MedicineLine";

export type MedicalRecord =  {
  id: number;
  endDate: string;
  startDate: string;
  medicineLines: MedicineLine[];
  observations: string;
  createdAt: string;
}