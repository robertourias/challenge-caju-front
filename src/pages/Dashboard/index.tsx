import { useRegistrationContext } from "~/RegistrationContext";
import Collumns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import { Loading } from "~/components";

import * as S from "./styles";

const DashboardPage = () => {
  const { registrations, isLoading } = useRegistrationContext();

  return (
    <S.Container>
      <Loading isVisible={isLoading}/>
      <SearchBar />
      <Collumns registrations={registrations} />
    </S.Container>
  );
};
export default DashboardPage;
