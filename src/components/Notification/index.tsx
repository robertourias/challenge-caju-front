import * as S from "./styles";

interface NotificationProps {
  isOpen: boolean;
  message: string;
  isError: boolean;
  onClose: () => void;
}

export const Notification = ({
  isOpen,
  message,
  isError,
  onClose,
}: NotificationProps) => {
  return (    
    <S.SnackbarContainer className={isOpen ? '' : 'hidden'} isError={isError}>
      <S.SnackbarContent>{message}</S.SnackbarContent>
      <S.SnackbarCloseButton onClick={onClose}>&times;</S.SnackbarCloseButton>
    </S.SnackbarContainer>
  );
};
