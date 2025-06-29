import * as yup from "yup";

export const loginSchema = yup.object().shape({
  id: yup.string().required("ID is required"),
  password: yup.string().required("Password is required"),
});
