import { useEffect, useState } from "react";
import { RegistrationType } from "~/@types/Registration";
import { api } from "~/utils/api";

const useFetchRegistration = () => {
  const [registrations, setRegistrations] = useState<RegistrationType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

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
    try {
      const response = await api.post("/registrations", newRegistration);
      setRegistrations([
        ...registrations,
        { ...response.data, admissionDate: new Date(response.data.admissionDate) },
      ]);
    } catch (err) {
      if(err instanceof Error) {
        setError(err);
      } 
    }
  };

  return { registrations, isLoading, error, addRegistration, setRegistrations };
};

export default useFetchRegistration;