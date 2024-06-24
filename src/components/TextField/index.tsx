import { InputHTMLAttributes } from "react";
import InputMask from "react-input-mask";
import * as S from "./styles";

type TextFieldProps = {
  label?: string;
  error?: string | boolean;
  cpf?: boolean;
} & InputHTMLAttributes<any>;

export const TextField = (props: TextFieldProps) => {
  return (
    <S.InputWrapper>
      <label htmlFor={props.id}>{props.label}</label>
      {!props.cpf ? (
        <S.Input {...props} />

      ) : (
        <S.Input as={InputMask} {...props} mask="999.999.999-99" />
      )}
      {props.error && (
        <span style={{fontSize: 12, color: 'red'}}>{props.error}</span>
      )}
    </S.InputWrapper>
  );
};

