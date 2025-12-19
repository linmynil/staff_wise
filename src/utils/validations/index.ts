import * as Yup from 'yup';

export const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W_]{8,}$/;
export const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const validateSchema = {
  password: Yup.string().trim().required('Please enter password'),
  // .matches(passwordRegExp, 'Password is not in correct format'),
  username: Yup.string().trim().required('Please enter your username'),
  email: Yup.string()
    .matches(emailRegExp, 'Invalid email address')
    .required('Please enter your email address'),
};

export default validateSchema;
