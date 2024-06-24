import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { StatusEnum } from "~/types/Status";
import { useRegistrationContext } from "~/RegistrationContext";

type RegistrationCardProps = {
  data: any;
  collumStatus: StatusEnum
};

const RegistrationCard = ({ data, collumStatus }: RegistrationCardProps) => {
  const { registrations } = useRegistrationContext();

  return (
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
          {collumStatus === StatusEnum.REVIEW && (
            <>
              <ButtonSmall bgcolor="rgb(255, 145, 154)" >Reprovar</ButtonSmall>
              <ButtonSmall bgcolor="rgb(155, 229, 155)">Aprovar</ButtonSmall>
            </>
          )}

          {collumStatus !== StatusEnum.REVIEW && (
            <ButtonSmall bgcolor="#ff8858">Revisar novamente</ButtonSmall>
          )}
        </S.Buttons>
        <HiOutlineTrash />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
