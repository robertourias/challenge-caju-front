import { createContext, useContext, useState, useEffect } from "react";

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
        setIsLoading(false);
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
    try {
      const response = await api.post("/registrations", parsedRegistration);
      setRegistrations([
        ...registrations,
        { ...response.data, admissionDate: formatDate(response.data.admissionDate) },
      ]);     
    } catch (err) {
      if(err instanceof Error) {
        setError(err);
      }
    }
  };

  const updateRegistrationStatus = async (
    id: string,
    status: StatusEnum
  ) => {
    try {
      await api.put(`/registrations/${id}`, { status });
      setRegistrations((prevRegistrations) =>
        prevRegistrations.map((registration) =>
          registration.id === id
            ? { ...registration, status }
            : registration
        )
      );
    } catch (err) {
      if(err instanceof Error) {
        setError(err);
      }
    }
  };

  const deleteRegistration = async (id: string) => {
    try {
      await api.delete(`/registrations/${id}`);
      setRegistrations((prevRegistrations) =>
        prevRegistrations.filter((registration) => registration.id !== id)
      );
    } catch (err) {
      setError(err);
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
    </RegistrationContext.Provider>
  );
};

export default RegistrationProvider;
