import { createContext, useContext, useState, useEffect } from "react";

import { Notification } from "./components";

import { RegistrationType } from "./types/Registration";
import { StatusEnum } from "./types/Status";
import { api, formatDate } from "./utils";

interface RegistrationContextType {
  registrations: RegistrationType[];
  isLoading: boolean;
  error: Error | null;
  addRegistration: (newRegistration: RegistrationType) => Promise<void>;
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
  const [error, setError] = useState(Error || null);
  const [notification, setNotification] = useState({
    isOpen: false,
    message: "",
    isError: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);        
      try {
        const response = await api.get("/registrations");
        setRegistrations(response.data);        
      } catch (err) {
        if(err instanceof Error) {
          setError(err);
        }
      } finally {
        setTimeout(() => {
          console.log("Simulando demora no carregamento...");      
          setIsLoading(false);        
        }, 2000);
      }
    };
    fetchData();
  }, []);

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
      handleNotification("Registro adicionado com sucesso!", false);
    } catch (err) {
      if(err instanceof Error) {
        setError(err);
        handleNotification(`Erro ao atualizar registro! ${err}`, true);
      }
    } finally {
      setTimeout(() => {
        console.log("Simulando demora no carregamento...");      
        setIsLoading(false);        
      }, 800);     
    }
  };

  const handleNotification = (message: string, isError: boolean) => {
    console.log({
      ...notification,
      isOpen: true,
      message,
      isError
    })
    setNotification(() => {
      return {
        ...notification,
        isOpen: true,
        message,
        isError
      }
    })

    setTimeout(() => {
      closeNotification();
    }, 1600);
  }

  const closeNotification = () => {
    setNotification({...notification,isOpen: false});
  }

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
      handleNotification("Status atualizado com sucesso!", false);
    } catch (err) {
      if(err instanceof Error) {
        setError(err);
        handleNotification(`Erro ao atualizar registro! ${err}`, true);
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
      handleNotification("Registro excluído com sucesso!", false);
      
    } catch (err) {
      if(err instanceof Error) {
        setError(err);
        handleNotification(`Erro ao atualizar registro! ${err}`, true);
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
    error,
    addRegistration,
    updateRegistrationStatus,
    deleteRegistration,
  };

  return (
    <RegistrationContext.Provider value={contextValue}>
      {children}
      <Notification isOpen={notification.isOpen} isError={notification.isError} message={notification.message} onClose={closeNotification} />
    </RegistrationContext.Provider>
  );
};

export default RegistrationProvider;
