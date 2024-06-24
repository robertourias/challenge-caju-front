// import { z as schema } from "zod";
import { StatusEnum } from "./Status";

export type RegistrationType = {
  id?: string,
  admissionDate?: string,
  status?: StatusEnum,
  email: string,
  employeeName: string,
  cpf: string,
}
