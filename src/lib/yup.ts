import * as Yup from "yup";
const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

export const loginSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .min(2, "Too Short!")
    .max(50, "Too Long!"),
  phone: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
    .matches(phoneRegExp, "Phone number is not valid"),
  email: Yup.string().email("Invalid email").required("Required"),
  address: Yup.string().required("Required"),
  dayOfBirth: Yup.date().required("Required"),
});

export const productSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .min(2, "Too Short!")
    .max(50, "Too Long!"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(500, "Too Long!")
    .required(),
  price: Yup.number().min(2, "Too Short!").required("Required"),
});
