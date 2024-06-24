// import { CircularProgress } from "@mui/material";
import { HiOutlineRefresh } from "react-icons/hi";
import * as S from "./styles";

interface LoadingProps {
  isVisible?: boolean;
  message?: string;
}

export const Loading = ({ isVisible = false, message = "Carregando ..." }: LoadingProps) => {
  return (
    isVisible && (
      <>     
        <S.LoaderGlobalStyles/>
        <S.Layer>
          <S.Loader>
            <HiOutlineRefresh />
            <span>{message}</span>
          </S.Loader>
        </S.Layer>
       </>
    )
  );
};
