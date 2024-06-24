import { ButtonSmall } from "../Buttons";
import *  as S from "./styles";

interface DialogProps {
  isOpen: boolean;
  text: string;
  onClose: () => void;
  onConfirm: () => void;  
}

export const  Dialog = ({ isOpen, text, onClose, onConfirm }: DialogProps) => {  
  if (!isOpen) {
    return null;
  }

  return (
    <S.DialogOverlay>
      <S.DialogContent>
        <S.DialogHeader>
          <S.DialogCloseButton onClick={onClose}>&times;</S.DialogCloseButton>
        </S.DialogHeader>
        <S.DialogBody>{text}</S.DialogBody>
        <S.DialogActions>
          <ButtonSmall onClick={onClose}>Cancelar</ButtonSmall>
          <ButtonSmall onClick={onConfirm} bgcolor="#64a98c" color="#FFF">Confirmar</ButtonSmall>
        </S.DialogActions>
      </S.DialogContent>
    </S.DialogOverlay>
  );
}
