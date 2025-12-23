import * as Yup from 'yup';

export const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W_]{8,}$/;
export const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const phoneRegExp = new RegExp(
  // /(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}(?:[^\d]+|$)/
  /^(0|84)(2(0[3-9]|1[0-689]|2[0-25-9]|3[2-9]|4[0-9]|5[124-9]|6[0369]|7[0-7]|8[0-9]|9[012346789])|3[2-9]|5[25689]|7[06-9]|8[0-9]|9[012346789])([0-9]{7})$/gm,
); // phone number in Viet Nam

const validateSchema = {
  password: Yup.string().trim().required('Please enter password'),
  // .matches(passwordRegExp, 'Password is not in correct format'),
  username: Yup.string().trim().required('Please enter your username'),
  email: Yup.string().matches(emailRegExp, 'Invalid email address'),
  phone: Yup.string().matches(phoneRegExp, 'The phone number is not in the correct format'),
};

export default validateSchema;
