// import { z as schema } from "zod";
import { StatusEnum } from "./Status";

// export const RegistrationSchema = schema.object({
//   id: schema.string().uuid(),
//   admissionDate: schema.string().datetime(),
//   email: schema.string().nonempty().email(),
//   employeeName: schema.string().nonempty(),
//   status: schema.string().nonempty(),
//   cpf: schema.string().nonempty(),
// })

// export type RegistrationType = schema.infer<typeof RegistrationSchema>;

export type RegistrationType = {
  id: string,
  admissionDate: string,
  email: string,
  employeeName: string,
  status: StatusEnum,
  cpf: string,
}