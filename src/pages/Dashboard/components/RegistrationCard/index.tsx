import { useRef } from "react";

import { useRegistrationContext } from "~/RegistrationContext";
import { ButtonSmall, Dialog } from "~/components";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

import { useModal, useStatus } from "~/hooks";
import { StatusEnum } from "~/types/Status";
import { RegistrationType } from "~/types/Registration";

import * as S from "./styles";

type RegistrationCardProps = {
  data: RegistrationType;
  collumStatus: StatusEnum
};

const RegistrationCard = ({ data, collumStatus }: RegistrationCardProps) => {
  const { updateRegistrationStatus, deleteRegistration } = useRegistrationContext();
  const { isOpenModal, modalText, handleToggleModal, handleModalText } = useModal();  
  const { status, handlerStatusChange } = useStatus(collumStatus);
  
  const idRegistration = useRef(data.id);
  const operation = useRef("update");
 
  function handleUpdate(text: string, status: StatusEnum) {
    handleModalText(text);
    handleToggleModal()
    handlerStatusChange(status)
    operation.current = "update";
  }

  async function handleConfirmDialog() {
    if(idRegistration.current) {
      if(operation.current === "delete") {
        await deleteRegistration(idRegistration.current);
      } else {
        await updateRegistrationStatus(idRegistration.current, data, status);
      }
      handleToggleModal()
    }
  }

  function handleDelete() {
    handleModalText("Tem certeza que deseja excluir este candidato?");
    handleToggleModal()
    operation.current = "delete";
  }

  return (
    <>
      <Dialog isOpen={isOpenModal} onClose={handleToggleModal} onConfirm={handleConfirmDialog} text={modalText} />
      <S.Card>
        <S.IconAndText>
          <HiOutlineUser />
          <h3>{data.employeeName}</h3>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineMail />
          <p>{data.email}</p>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineCalendar />
          <span>{data.admissionDate}</span>
        </S.IconAndText>
        <S.Actions>
          <S.Buttons>
            {
            collumStatus === StatusEnum.REVIEW && (
              <>
                <ButtonSmall bgcolor="rgb(255, 145, 154)" onClick={() => handleUpdate("Tem certeza que gostaria de Reprovar este candidato?", StatusEnum.REPROVED)}>Reprovar</ButtonSmall>
                <ButtonSmall bgcolor="rgb(155, 229, 155)" onClick={() => handleUpdate("Tem certeza que gostaria de Aprovar este candidato?", StatusEnum.APPROVED)}>Aprovar</ButtonSmall>
              </>
            )}

            {collumStatus !== StatusEnum.REVIEW && (
              <ButtonSmall bgcolor="#ff8858" onClick={() => handleUpdate("Tem certeza que gostaria de Revisar novamente este candidato?", StatusEnum.REVIEW)}>Revisar novamente</ButtonSmall>
            )}
          </S.Buttons>
          
          <HiOutlineTrash onClick={handleDelete} />          
        </S.Actions>
      </S.Card>
    </>
  );
};

export default RegistrationCard;
