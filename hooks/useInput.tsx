import { useState } from 'react';

const useInput = (
  validate: (_value: string) => boolean,
  optionalDefault: string = ''
) => {
  const [value, setValue] = useState(optionalDefault);
  const [error, setError] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const isError = isTouched && error;

  const handleChange = (value: string) => {
    setValue(value);
  };
  const onFocus = () => {
    setError(false);
    setIsTouched(true);
  };
  const onBlur = () => {
    const isValueValid = validate(value);

    setError(!isValueValid);
  };

  return { value, handleChange, isError, onFocus, onBlur };
};

export default useInput;
