import { useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useRegistrationContext } from "~/RegistrationContext";
import routes from "~/router/routes";
import { useNotification } from "~/hooks";
import { StatusEnum } from "~/types/Status";
import { Button, IconButton, TextField } from "~/components";

import * as S from "./styles";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .matches(
      /^[a-zA-Z\s]+$/,
      "O nome deve conter apenas letras e espaços"
    ),
  email: Yup.string()
    .email("Insira um endereço de email válido")
    .required("O email é obrigatório"),
  cpf: Yup.string()
    .required("O CPF é obrigatório")
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "Insira um CPF válido no formato 000.000.000-00"
    ),
});


const NewUserPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { handleOpenNotification } = useNotification();
  const { addRegistration } = useRegistrationContext();

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      cpf: "",
      admissionDate: format(new Date(), "dd/MM/yyyy", { locale: ptBR }),
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      
      try {
        await addRegistration({
          employeeName: values.name,
          email: values.email,
          cpf: values.cpf,
          admissionDate: values.admissionDate,
          status: StatusEnum.REVIEW,
        });
        handleOpenNotification("Registro criado com sucesso!");
        history.push(routes.dashboard);
      } catch (error) {
        console.error("Erro ao criar registro", error);
        handleOpenNotification("Erro ao criar registro!", true);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <form onSubmit={formik.handleSubmit}>
          <TextField placeholder="Nome" label="Nome" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} error={formik.touched.name && formik.errors.name}/>
          <TextField placeholder="Email" label="Email" id="email" type="text" name="email" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && formik.errors.email} />
          <TextField type="text" cpf placeholder="CPF" label="CPF" id="cpf" name="cpf" value={formik.values.cpf} onChange={formik.handleChange} error={formik.touched.cpf && formik.errors.cpf} />
          <TextField label="Data de admissão" type="text" disabled id="admissionDate" name="admissionDate" value={formik.values.admissionDate} onChange={formik.handleChange} error={formik.touched.admissionDate && formik.errors.admissionDate}/>
          <Button disabled={isLoading} onClick={() => {}}>{isLoading ? "Cadastrando..." : "Cadastrar"}</Button>
        </form>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
