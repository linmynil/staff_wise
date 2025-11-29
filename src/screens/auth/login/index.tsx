import { AccountIcon, LockIcon } from '@assets';
import { Button, PasswordInput, Text, TextInput, View } from '@components';
import AuthLayout from '@components/layout/auth-layout';
import { setToken } from '@redux/reducers/auth.slice';
import { useAppDispatch } from '@redux/selectors';
import { baseAPI } from '@services/baseAPI';
import colors from '@utils/constants/colors';
import validateSchema from '@utils/validations';
import { Formik } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

const initialForm = { username: '', password: '' };

const Login = () => {
  const dispatch = useAppDispatch();
  // const setFieldErrorRef = useRef<
  //   (field: string, message: string | undefined) => void
  // >(() => {});
  // const [login, { isLoading, error }] = useLoginMutation();

  const validationSchema = Yup.object({
    username: validateSchema.username,
    password: validateSchema.password,
  });

  const signIn = async (values: typeof initialForm) => {
    console.log('values', JSON.stringify(values, null, 2));
    const token = 'day-la-token';
    if (token) {
      dispatch(baseAPI.util.resetApiState());
      dispatch(
        setToken({
          access_token: token,
        }),
      );
    }
  };

  // const errorCode = (error as any)?.data?.statusCode;
  // useEffect(() => {
  //   if (errorCode && setFieldErrorRef.current) {
  //     setFieldErrorRef.current('emailOrPhoneNumber', t('code.' + errorCode));
  //     setFieldErrorRef.current('password', t('code.' + errorCode));
  //   }
  // }, [errorCode]);

  return (
    <AuthLayout>
      <Formik
        initialValues={initialForm}
        onSubmit={signIn}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          // isValid,
          // dirty,
          // setFieldError,
          setFieldValue,
          setFieldTouched,
        }) => {
          // setFieldErrorRef.current = setFieldError;
          return (
            <View style={styles.container}>
              <View
                column
                flex={1}
                gap={16}
                style={{
                  justifyContent: 'center',
                }}
              >
                <Text size={16} weight={600}>
                  Welcome back!
                </Text>

                <TextInput
                  value={values.username}
                  onChangeText={handleChange('username')}
                  placeholder="Username/Email"
                  leftIcon={<AccountIcon />}
                  inputContainerStyle={{
                    borderColor: colors.primary.default,
                  }}
                  placeholderColor={colors.neutral.c500}
                  error={touched.username && errors.username}
                />
                <PasswordInput
                  value={values.password}
                  onChangeText={(text: string) => {
                    setFieldTouched('password', true);
                    setFieldValue('password', text);
                  }}
                  inputContainerStyle={{
                    borderColor: colors.primary.default,
                  }}
                  placeholderColor={colors.neutral.c500}
                  placeholder="Password"
                  leftIcon={<LockIcon />}
                  error={touched.password && errors.password}
                />
              </View>

              <Button
                title="Login"
                // disabled={!isValid || !dirty}
                onPress={handleSubmit}
              />
            </View>
          );
        }}
      </Formik>
    </AuthLayout>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 16,
  },
});
