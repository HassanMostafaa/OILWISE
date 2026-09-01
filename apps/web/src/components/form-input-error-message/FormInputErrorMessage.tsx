import React, { FunctionComponent } from "react";

interface FormInputErrorMessageProps {
  message?: string;
}
export const FormInputErrorMessage: FunctionComponent<
  FormInputErrorMessageProps
> = ({ message }) => {
  if (!message) return null;
  return <p className="text-xs text-rose-500">{message}</p>;
};
