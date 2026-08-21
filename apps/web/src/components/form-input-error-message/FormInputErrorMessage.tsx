import React, { FunctionComponent } from "react";

interface FormInputErrorMessageProps {
  message?: string;
}
export const FormInputErrorMessage: FunctionComponent<
  FormInputErrorMessageProps
> = ({ message }) => {
  if (!message) return null;
  return <p className="my-1 text-xs text-rose-500 dark:text-rose-300">{message}</p>;
};
