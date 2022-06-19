export type MedicalCare = {
  id: number;                               
  patientId: number | undefined;                      
  createdAt: Date;
  updatedAt: Date;
  healthProfessionalId: number;
  attended: boolean              
  date: Date
  canceled: boolean
}