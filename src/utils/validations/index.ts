import * as Yup from 'yup';

export const passwordRegExp =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W_]{8,}$/;

const validateSchema = {
  password: Yup.string()
    .trim()
    .required('Please enter password!')
    .matches(passwordRegExp, 'Password is not in correct format!'),
  username: Yup.string().trim().required('Please enter your username!'),
};

export default validateSchema;
