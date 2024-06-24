import { useRef, useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { removeCpfMask } from "~/utils/removeMask";
import { Button } from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import { TextField } from "~/components/TextField";
import routes from "~/router/routes";
import { useRegistrationContext } from "~/RegistrationContext";

import * as S from "./styles";
import { useNotification } from "~/hooks";


const validationSchema = Yup.object().shape({
  cpf: Yup.string()
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "Insira um CPF válido no formato 000.000.000-00"
    )
});
export const SearchBar = () => {
  const cpfRef = useRef(0);
  const { fetchData, registrationsCPF } = useRegistrationContext();
  const { handleOpenNotification } = useNotification();
  const history = useHistory();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleRefresh = () => {
    fetchData();
    formik.resetForm();
  };

  const handleCPF = (e: any) => {
    const { value } = e.target;
    cpfRef.current = value;
    
    if((cpfRef.current).toString().length === 14) {
      formik.handleSubmit();
    }
  };

  const formik = useFormik({
    initialValues: { cpf: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await registrationsCPF(removeCpfMask(values.cpf));
      } catch (error) {
        handleOpenNotification("Erro ao criar registro!", true);
      } 
    },
  });
  
  return (
    <S.Container>
      <form onSubmit={formik.handleSubmit}>
        <TextField cpf  
          placeholder="Digite um CPF válido" 
          label="CPF" 
          id="cpf" 
          name="cpf" 
          value={formik.values.cpf} 
          error={formik.touched.cpf && formik.errors.cpf}
          onChange={formik.handleChange}
          onKeyUp={handleCPF} />
        <S.Actions>
          <IconButton aria-label="refetch" onClick={handleRefresh}>
            <HiRefresh />
          </IconButton>
          <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
        </S.Actions>
      </form>
    </S.Container>
  );
};
