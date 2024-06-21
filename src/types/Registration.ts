import { z as schema } from "zod";

export const RegistrationSchema = schema.object({
  id: schema.string().uuid(),
  admissionDate: schema.string().datetime(),
  email: schema.string().nonempty().email(),
  employeeName: schema.string().nonempty(),
  status: schema.string().nonempty(),
  cpf: schema.string().nonempty(),
})

export type RegistrationType = schema.infer<typeof RegistrationSchema>;