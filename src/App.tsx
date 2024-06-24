import RegistrationProvider from "./RegistrationContext";
import Router from "./router";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <RegistrationProvider>
        <Header>
          <h1>Caju Front Teste: Candidato Roberto Nicoletti</h1>
        </Header>
        <Router />     
      </RegistrationProvider>
    </>
  );
}

export default App;
