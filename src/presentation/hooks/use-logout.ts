import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import apiContext from "@/presentation/contexts/api/api-context";

type ResultType = () => void;

export const useLogout = (): ResultType => {
  const history = useNavigate();
  const { setCurrentAccount } = useContext(apiContext);
  return (): void => {
    setCurrentAccount(undefined);
    history("/login");
  };
};
