import * as Yup from "yup";

const nameRegex = /^[A-Za-z]+$/;

export const nameValidation = Yup.string()
  .matches(nameRegex, "Only English letters")
  .min(2, "Minimum 2 characters")
  .max(50, "Maximum 50 characters")
  .required("Required");

export const emailValidation = Yup.string().email("Invalid email").required("Required");

export const passwordValidation = Yup.string()
  .min(4, "Minimum 4 characters")
  .max(50, "Maximum 50 characters");

export const confirmPasswordValidation = Yup.string()
  .oneOf([Yup.ref("password"), null], "Passwords must match");
