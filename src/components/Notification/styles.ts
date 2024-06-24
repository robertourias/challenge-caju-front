import { styled } from "styled-components";

type SnackbarContainerProps = {
  isError: boolean;
}

export const SnackbarContainer = styled.div<SnackbarContainerProps>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: auto;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #FFF;
  color: ${props => props.isError ? 'red' : '#000'};
  transition: transform 0.3s ease-in-out;
  border-radius: 10px;
  box-shadow: 0px 1px 10px 4px #CCC;

  &.hidden {
    transform: translateY(100%);
    opacity: 0;
  }
`;

export const SnackbarContent = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export const SnackbarCloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  margin-left: 10px;
`;
