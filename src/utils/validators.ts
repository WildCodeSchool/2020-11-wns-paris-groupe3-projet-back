import { InputRegisterLoginErrorsType } from "../types/types";

const validateInputRegister = (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  confirmPassword: string
): InputRegisterLoginErrorsType => {
  const errors: { [key: string]: string } = {};
  if (firstname.trim() === "") {
    errors.firstname = "Firstname must not be empty";
  }
  if (lastname.trim() === "") {
    errors.lastname = "Lastname must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-.\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (password === "") {
    errors.password = "Password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateInputLogin = (
  email: string,
  password: string
): InputRegisterLoginErrorsType => {
  const errors: { [key: string]: string } = {};
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  }
  if (password === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export { validateInputRegister, validateInputLogin };
