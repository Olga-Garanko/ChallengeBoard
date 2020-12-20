import { useState } from 'react';

export const useInputChange = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setValues({
        ...values,
        [e.currentTarget.name]: e.currentTarget.value
    });
    setErrors({
        ...errors,
        [e.currentTarget.name]: null
    })
  }

  return [values, errors, handleInputChange]
}