
import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { StatusEnum } from "~/types/Status";
import { RegistrationType } from "~/types/Registration";

const allColumns = [
  { status: StatusEnum.REVIEW, title: "Pronto para revisar" },
  { status: StatusEnum.APPROVED, title: "Aprovado" },
  { status: StatusEnum.REPROVED, title: "Reprovado" },
];

type Props = {
  registrations?: RegistrationType[];
};
const Collumns = (props: Props) => {
  return (
    <S.Container>
      {allColumns.map((collum) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <>
              <S.TitleColumn status={collum.status}>
                {collum.title}
              </S.TitleColumn>
              <S.CollumContent>
                {props?.registrations?.map((registration) => {
                  return (
                    <RegistrationCard
                      data={registration}
                      key={registration.id}
                    />
                  );
                })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;
