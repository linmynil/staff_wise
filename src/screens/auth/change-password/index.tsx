import { LockIcon } from '@assets';
import { Button, PasswordInput, Text, View } from '@components';
import AuthLayout from '@components/layout/auth-layout';
import { removeKey } from '@config/mmkv';
import { useNavigation } from '@react-navigation/native';
import { TokenType } from '@redux/reducers/auth.slice';
import { useChangePasswordMutation } from '@services/auth';
import colors from '@utils/constants/colors';
import { AuthErrorCode, AuthErrorsMap } from '@utils/errors/auth.errors';
import events, { eventKeys } from '@utils/helpers/events';
import axios from 'axios';
import { Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

const initialForm = { oldPassword: '', newPassword: '', reNewPassword: '' };

const ChangePassword = () => {
  const navigation = useNavigation<any>();
  const setFieldErrorRef = useRef<
    (field: string, message: string | undefined) => void
  >(() => {});
  const [changePassword, { isLoading, error }] = useChangePasswordMutation();

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required('Please enter your old password'),
    newPassword: Yup.string()
      .notOneOf(
        [Yup.ref('oldPassword')],
        'New password must be different from old password',
      )
      .required('Please enter your new password'),
    reNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
      .required('Please re-enter your new password'),
  });

  const resetToken = async () => {
    removeKey(TokenType.ACCESS_TOKEN);
    events.emit(eventKeys.resetToken);
    axios.defaults.headers.common.Authorization = '';
  };

  const confirmChangePassword = async (values: typeof initialForm) => {
    changePassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    })
      .then(async res => {
        if (res?.data?.message) {
          await resetToken();
          navigation.goBack();
          Toast.show({
            type: 'success',
            text1: 'Password changed successfully!',
          });
        }
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'An error occurred. Please try again!',
        });
      });
  };

  const errorCode = (error as any)?.data?.errorCode;
  useEffect(() => {
    if (errorCode && setFieldErrorRef.current) {
      switch (errorCode) {
        case AuthErrorCode.ACCOUNT_OLD_PASSWORD_INCORRECT:
          setFieldErrorRef.current('oldPassword', AuthErrorsMap[errorCode]);
          break;
        case AuthErrorCode.ACCOUNT_NEW_PASSWORD_SAME_AS_OLD:
          setFieldErrorRef.current('newPassword', AuthErrorsMap[errorCode]);
          setFieldErrorRef.current('reNewPassword', AuthErrorsMap[errorCode]);
          break;
        default:
          Toast.show({
            type: 'error',
            text1: 'An error occurred. Please double-check!',
          });
      }
    }
  }, [errorCode]);

  return (
    <AuthLayout heightHeader={0.25} back={<AuthLayout.BackToPreviousButton />}>
      <Formik
        initialValues={initialForm}
        onSubmit={confirmChangePassword}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={false}
      >
        {({
          values,
          handleSubmit,
          errors,
          touched,
          setFieldError,
          setFieldValue,
          setFieldTouched,
        }) => {
          setFieldErrorRef.current = setFieldError;
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
                  Change Password!
                </Text>
                <PasswordInput
                  passwordVisible
                  value={values.oldPassword}
                  onChangeText={(text: string) => {
                    setFieldTouched('oldPassword', true);
                    setFieldValue('oldPassword', text);
                  }}
                  inputContainerStyle={{
                    borderColor: colors.primary.default,
                  }}
                  placeholderColor={colors.neutral.c500}
                  placeholder="Old Password"
                  leftIcon={<LockIcon />}
                  error={touched.oldPassword && errors.oldPassword}
                />

                <PasswordInput
                  passwordVisible
                  value={values.newPassword}
                  onChangeText={(text: string) => {
                    setFieldTouched('newPassword', true);
                    setFieldValue('newPassword', text);
                  }}
                  inputContainerStyle={{
                    borderColor: colors.primary.default,
                  }}
                  placeholderColor={colors.neutral.c500}
                  placeholder="New Password"
                  leftIcon={<LockIcon />}
                  error={touched.newPassword && errors.newPassword}
                />

                <PasswordInput
                  passwordVisible
                  value={values.reNewPassword}
                  onChangeText={(text: string) => {
                    setFieldTouched('reNewPassword', true);
                    setFieldValue('reNewPassword', text);
                  }}
                  inputContainerStyle={{
                    borderColor: colors.primary.default,
                  }}
                  placeholderColor={colors.neutral.c500}
                  placeholder="Re-enter New Password"
                  leftIcon={<LockIcon />}
                  error={touched.reNewPassword && errors.reNewPassword}
                />
              </View>

              <Button
                title="Confirm"
                disabled={Object.keys(errors).length > 0}
                loading={isLoading}
                onPress={handleSubmit}
              />
            </View>
          );
        }}
      </Formik>
    </AuthLayout>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 16,
  },
});
