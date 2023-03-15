import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import apiContext from "@/presentation/contexts/api/api-context";
import { AccessDeniedError } from "@/domain/errors";

type CallbackType = (error: Error) => void;
type ResultType = CallbackType;

export const useErrorHandler = (callback: CallbackType): ResultType => {
  const history = useNavigate();
  const { setCurrentAccount } = useContext(apiContext);
  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined);
      history("/login");
    } else {
      callback(error);
    }
  };
};
