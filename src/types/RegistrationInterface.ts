import { StatusEnum } from "./Status";

export interface RegistrationInterface {
  id: string
  admissionDate: string,
  email: string,
  employeeName: string,
  status: StatusEnum,
  cpf: string,
}