import styled from "./Checkout.module.css";

import useInput from "../../hooks/useInput";

const isNotEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {

  const {
    value: enteredName,
    isValid: isNameValid,
    isInvalid: isNameInvalid,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: enteredStreet,
    isValid: isStreetValid,
    isInvalid: isStreetInvalid,
    valueChangeHandler: streetChangeHandler,
    valueBlurHandler: streetBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: enteredPostalCode,
    isValid: isPostalCodeValid,
    isInvalid: isPostalCodeInvalid,
    valueChangeHandler: postalCodeChangeHandler,
    valueBlurHandler: postalCodeBlurHandler,
  } = useInput(isFiveChars);

  const {
    value: enteredCity,
    isValid: isCityValid,
    isInvalid: isCityInvalid,
    valueChangeHandler: cityChangeHandler,
    valueBlurHandler: cityBlurHandler,
  } = useInput(isNotEmpty);

  const submitHandler = (event) => {
    event.preventDefault();
    const userInforInput = {
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    };
    const formIsValid =
      isNameValid && isStreetValid && isPostalCodeValid && isCityValid;
    if (formIsValid) {
      props.onSubmitToDB(userInforInput);
    }
  };

  return (
    <form className={styled.form} onSubmit={submitHandler}>
      <div className={styled.group}>
        <div className={`${styled.control} ${isNameInvalid && styled.invalid}`}>
          <label htmlFor="name">Your Name</label>
          <input
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
            type="text"
            id="name"
          />
          {isNameInvalid && <p>Please input a valid Name!</p>}
        </div>
        <div
          className={`${styled.control} ${isStreetInvalid && styled.invalid}`}
        >
          <label htmlFor="street">Street</label>
          <input
            onChange={streetChangeHandler}
            onBlur={streetBlurHandler}
            value={enteredStreet}
            type="text"
            id="street"
          />
          {isStreetInvalid && <p>Please input a valid Street!</p>}
        </div>
      </div>
      <div className={styled.group}>
        <div
          className={`${styled.control} ${
            isPostalCodeInvalid && styled.invalid
          }`}
        >
          <label htmlFor="postal">Postal Code</label>
          <input
            onChange={postalCodeChangeHandler}
            onBlur={postalCodeBlurHandler}
            value={enteredPostalCode}
            type="text"
            id="postal"
          />
          {isPostalCodeInvalid && <p>Please input a valid Postal Code!</p>}
        </div>
        <div className={`${styled.control} ${isCityInvalid && styled.invalid}`}>
          <label htmlFor="city">City</label>
          <input
            onChange={cityChangeHandler}
            onBlur={cityBlurHandler}
            value={enteredCity}
            type="text"
            id="city"
          />
          {isCityInvalid && <p>Please input a valid City!</p>}
        </div>
      </div>
      <div className={styled.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={styled.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
