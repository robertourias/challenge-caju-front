import { createContext, useContext, useState, useEffect } from "react";

import { RegistrationType } from "./types/Registration";
import { StatusEnum } from "./types/Status";
import { Notification } from "./components";
import { useNotification } from "./hooks";

import { api, formatDate } from "./utils";

interface RegistrationContextType {
  registrations: RegistrationType[];
  isLoading: boolean;
  error?: Error | null;
  addRegistration: (newRegistration: RegistrationType) => Promise<void>;
  fetchData: () => Promise<void>;
  registrationsCPF: (cpf: string) => Promise<void>;
  updateRegistrationStatus: (
    id: string,
    data: RegistrationType,
    status: StatusEnum
  ) => Promise<void>;
  deleteRegistration: (id: string) => Promise<void>;
}

const RegistrationContext = createContext<RegistrationContextType | null>(
  null
);

export const useRegistrationContext = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error(
      "useRegistrationContext deve ser usado dentro do RegistrationProvider"
    );
  }
  return context;
};

const RegistrationProvider = ({ children }: { children: React.ReactNode }) => {
  const [registrations, setRegistrations] = useState<RegistrationType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { 
    isOpen,
    message,
    isError,
    handleOpenNotification,
    handleCloseNotification 
  } = useNotification();
 
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);        
    try {
      const response = await api.get("/registrations");
      setRegistrations(response.data);        
    } catch (err) {
      if(err instanceof Error) {
        handleOpenNotification(`Error fetching registration ${err}`, true);          
      }
    } finally {
      setTimeout(() => {
        console.log("Simulando demora no carregamento...");      
        setIsLoading(false);        
      }, 2000);
    }
  };

  const registrationsCPF = async (cpf: string) => {
    setIsLoading(true);
    try {      
      const response = await api.get(`/registrations?cpf=${cpf}`);
      setRegistrations(response.data);        
      } catch (err) {
        if(err instanceof Error) {
          handleOpenNotification(`Error fetching registration ${err}`, true);          
        }
      } finally {
        setTimeout(() => {
          console.log("Simulando demora no carregamento...");      
          setIsLoading(false);        
        }, 2000);
      }
  };

  const addRegistration = async (newRegistration: RegistrationType) => {
    const parsedRegistration = {
      ...newRegistration,      
      admissionDate: new Date(), 
      status: StatusEnum.REVIEW       
    }
    setIsLoading(true);
    try {
      const response = await api.post("/registrations", parsedRegistration);
      setRegistrations([
        ...registrations,
        { ...response.data, admissionDate: formatDate(response.data.admissionDate) },
      ]);    
      handleOpenNotification(`Registro adicionado com sucesso!`, false);
    } catch (err) {
      if(err instanceof Error) {
        handleOpenNotification(`Error fetching registration ${err}`, true);
      }
    } finally {
      setTimeout(() => {
        console.log("Simulando demora no carregamento...");      
        setIsLoading(false);        
      }, 800);     
    }
  };
 
  const updateRegistrationStatus = async (
    id: string,
    registration: RegistrationType,
    status: StatusEnum
  ) => {
    setIsLoading(true);
    try {
      await api.put(`/registrations/${id}`, { ...registration, status });
      setRegistrations((prevRegistrations) =>
        prevRegistrations.map((item) =>
          item.id === id
            ? { ...item, status }
            : item
        )
      );      
      handleOpenNotification(`Status atualizado com sucesso!`, false);
    } catch (err) {
      if(err instanceof Error) {        
        handleOpenNotification(`Error fetching registration ${err}`, true);
      }
    } finally {
      setTimeout(() => {
        console.log("Simulando demora no carregamento...");      
        setIsLoading(false);
      }, 800);     
    }
  };

  const deleteRegistration = async (id: string) => {
    setIsLoading(true);
    try {      
      await api.delete(`/registrations/${id}`);
      setRegistrations((prevRegistrations) =>
        prevRegistrations.filter((registration) => registration.id !== id)
      );      
      handleOpenNotification(`Registro excluído com sucesso!`, false);
      
    } catch (err) {
      if(err instanceof Error) {
        handleOpenNotification(`Error fetching registration ${err}`, true);
      }
    } finally {
      setTimeout(() => {
        console.log("Simulando demora no carregamento...");      
        setIsLoading(false);        
      }, 800);     
    }
  };

  const contextValue: RegistrationContextType = {
    registrations,
    isLoading,
    fetchData,
    registrationsCPF,
    addRegistration,
    updateRegistrationStatus,
    deleteRegistration,
  };

  return (
    <RegistrationContext.Provider value={contextValue}>
      {children}
      <Notification isOpen={isOpen} isError={isError} message={message} onClose={handleCloseNotification} />
    </RegistrationContext.Provider>
  );
};

export default RegistrationProvider;
