import { useState } from "react";
import { StatusEnum } from "~/@types/Status";

export const useStatus = (initialStatus: StatusEnum) => {
  const [status, setStatus] = useState(initialStatus);

  const handlerStatusChange = (newStatus: StatusEnum) => {
    setStatus(newStatus)
  };

  return { status, handlerStatusChange };
}