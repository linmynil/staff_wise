import { AccountIcon, LockIcon } from '@assets';
import { Button, PasswordInput, Text, TextInput, View } from '@components';
import AuthLayout from '@components/layout/auth-layout';
import { removeKey, setString } from '@config/mmkv';
import { AuthRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { setAccountInfo } from '@redux/reducers/account.slice';
import { setToken, TokenType } from '@redux/reducers/auth.slice';
import { useAppDispatch } from '@redux/store';
import { useLoginMutation } from '@services/auth';
import { baseAPI } from '@services/baseAPI';
import colors from '@utils/constants/colors';
import { AuthErrorsMap } from '@utils/errors/auth.errors';
import events, { eventKeys } from '@utils/helpers/events';
import validateSchema from '@utils/validations';
import axios from 'axios';
import { Formik, FormikErrors } from 'formik';
import React, { useEffect, useRef } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

const initialForm = { username: '', password: '' };

const Login = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const setFieldErrorRef = useRef<(field: string, message: string | undefined) => void>(() => {});
  const setFieldValueRef = useRef<
    | ((
        field: string,
        value: any,
        shouldValidate?: boolean,
      ) => Promise<void | FormikErrors<{ username: string; password: string }>>)
    | null
  >(null);
  const [login, { isLoading, error }] = useLoginMutation();

  const validationSchema = Yup.object({
    username: validateSchema.username,
    password: validateSchema.password,
  });

  const signIn = async (values: typeof initialForm) => {
    login({
      username: values.username?.trim(),
      password: values.password,
    }).then(async res => {
      const token = res?.data?.access_token;
      const accountInfo = res?.data?.account;
      const mustChangePassword = res?.data?.account?.mustChangePassword;
      const roles = res?.data?.roles;
      const permissions = res?.data?.permissions;
      if (token && accountInfo) {
        removeKey(TokenType.ACCESS_TOKEN);
        events.emit(eventKeys.resetToken);
        axios.defaults.headers.common.Authorization = '';
        dispatch(baseAPI.util.resetApiState());
        dispatch(setAccountInfo(accountInfo));
        setString(TokenType.ACCESS_TOKEN, token);

        if (mustChangePassword) {
          navigation.navigate(AuthRoutes.AUTH_CHANGE_PASSWORD);
          setFieldValueRef?.current?.('password', '', false);
          Toast.show({
            type: 'info',
            text1: 'First-time login detected. Please update your password to access all features!',
            visibilityTime: 8000,
          });
          return;
        }
        dispatch(
          setToken({
            access_token: token,
            roles: roles,
            permissions: permissions,
          }),
        );
      }
    });
  };

  const errorCode = (error as any)?.data?.errorCode;
  useEffect(() => {
    if (errorCode && setFieldErrorRef.current) {
      setFieldErrorRef.current('username', AuthErrorsMap[errorCode]);
      setFieldErrorRef.current('password', AuthErrorsMap[errorCode]);
    }
  }, [errorCode]);

  return (
    <AuthLayout>
      <Formik initialValues={initialForm} onSubmit={signIn} validationSchema={validationSchema}>
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          setFieldError,
          setFieldValue,
          setFieldTouched,
        }) => {
          setFieldErrorRef.current = setFieldError;
          setFieldValueRef.current = setFieldValue;
          return (
            <React.Fragment>
              <KeyboardAvoidingView
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
                enabled
                behavior={Platform.select({ ios: 'padding', android: undefined })}
                keyboardVerticalOffset={200}
              >
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

                  <Button title="Login" loading={isLoading} onPress={handleSubmit} />
                </View>
              </KeyboardAvoidingView>
            </React.Fragment>
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
