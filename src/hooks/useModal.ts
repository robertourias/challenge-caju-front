import { useState } from "react";

export const useModal = () => {
  const [isOpenModal, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleToggleModal = () => {
    setIsOpen(!isOpenModal);
  };
  
  const handleModalText = (text: string) => {
    setModalText(text);
  };

  return { isOpenModal, modalText, handleToggleModal, handleModalText };
};
