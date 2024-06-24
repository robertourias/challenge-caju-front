import styled from 'styled-components';

export const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DialogContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 560px;
  width: 90%;
`;

export const DialogHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 20px;
`;

export const DialogCloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 30px;
`;

export const DialogBody = styled.div`
  /* Estilos para o corpo do modal */
`;

export const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 40px;
`;
