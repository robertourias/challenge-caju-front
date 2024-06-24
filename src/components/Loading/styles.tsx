import styled, { createGlobalStyle } from "styled-components";

const transformDelayed = "translate 0.5s ease-in-out"

export const LoaderGlobalStyles = createGlobalStyle`
  body {
    transform: ${transformDelayed};
    overflow: hidden;     
  }
`

export const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0009;
  display: flex;
  justifyContent: "center",
  alignItems: "center"
`;

export const Loader = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 20px 40px;
  transform: translate(-50%, -50%);
  background-color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  font-size: 20px
`;
