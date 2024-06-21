import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { RegistrationInterface } from "~/types/RegistrationInterface";

const registrations: RegistrationInterface[] = [
  {
    "admissionDate": "22/10/2023",
    "email": "luiz@caju.com.br",
    "employeeName": "Luiz Filho",
    "status": "APROVED",
    "cpf": "56642105087",
    "id": "3"
  },
  {
    "id": "1",
    "admissionDate": "22/10/2023",
    "email": "filipe@caju.com.br",
    "employeeName": "Filipe Marins",
    "status": "REVIEW",
    "cpf": "78502270001"
  },
  {
    "id": "2",
    "admissionDate": "22/10/2023",
    "email": "jose@caju.com.br",
    "employeeName": "José Leão",
    "status": "REPROVED",
    "cpf": "78502270001"
  },
  {
    "admissionDate": "20/06/2024",
    "email": "roberto.urias@caju.com.br",
    "employeeName": "Roberto Nicoletti",
    "status": "APROVED",
    "cpf": "35704637884",
    "id": "e27a"
  }
];

const DashboardPage = () => {
  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={registrations} />
    </S.Container>
  );
};
export default DashboardPage;
