import * as yup from "yup";

export const patientSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Phone Number must be a valid phone number")
    .required("phoneNumber is required"),
  dob: yup
    .string()
    .required("Date of birth is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "DOB must be in YYYY-MM-DD format")
    .test("is-valid-date", "Invalid date format or value", (value) => {
      if (!value) return false;
      const date = new Date(value);
      return (
        !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
      );
    })
    .test("is-past-date", "DOB cannot be a future date", (value) => {
      if (!value) return true;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dobDate = new Date(value);
      return dobDate <= today;
    }),
});
