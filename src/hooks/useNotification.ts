import { useState } from "react";

export const useNotification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleOpenNotification = (
    message: string,
    isError: boolean = false
  ) => {
    setMessage(message);
    setIsError(isError);
    setIsOpen(true);

    setTimeout(() => {
      handleCloseNotification();
    }, 1600);
  };

  const handleCloseNotification = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    message,
    isError,
    handleOpenNotification,
    handleCloseNotification,
  };
};
