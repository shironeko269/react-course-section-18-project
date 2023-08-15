import { useState } from "react";

const useInput = (validate = () => {}) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouch, setIsTouch] = useState(false);

  const isValid = validate(enteredValue);
  const isInvalid = !isValid && isTouch;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueBlurHandler = (event) => {
    setIsTouch(true);
  };

  return {
    value: enteredValue,
    isValid,
    isInvalid,
    valueChangeHandler,
    valueBlurHandler,
  };
};

export default useInput;
