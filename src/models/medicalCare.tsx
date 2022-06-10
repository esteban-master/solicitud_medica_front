export type MedicalCare = {
  id: number;                               
  patientId: number;                      
  createdAt: Date;
  updatedAt: Date;
  healthProfessionalId: number;
  attended: boolean              
  date: Date
}