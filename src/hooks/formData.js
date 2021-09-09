import { useState } from "react";

export const useFormData = (values) => {
  const [formValues, setFormValues] = useState({
    ...values
  });

  const handleFormValueChange = (key, value) => {
    setFormValues(
      {
        ...formValues,
        [key]: value
      }
    );
  };

  return [
    formValues,
    handleFormValueChange,
    setFormValues,
  ]
};