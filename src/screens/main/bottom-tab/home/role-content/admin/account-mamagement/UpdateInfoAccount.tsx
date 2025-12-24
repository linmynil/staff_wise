/* eslint-disable react-hooks/rules-of-hooks */
import { Button, TextInput, View } from '@components';
import SelectBox from '@components/common/select-box';
import MainLayout from '@components/layout/main-layout';
import { useNotify } from '@hooks/useNotify';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '@redux/store';
import { useGetAccountInfoQuery, useUpdateAccountMutation } from '@services/account';
import { baseAPI, tagTypes } from '@services/baseAPI';
import { useGetRolesQuery } from '@services/role';
import colors from '@utils/constants/colors';
import { statusOptions } from '@utils/constants/form';
import { checkIsRequired } from '@utils/helpers/form.helper';
import { UpdateAccountBody } from '@utils/types/account.type';
import { ErrorAPI } from '@utils/types/other.type';
import validateSchema from '@utils/validations';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

const UpdateInfoAccount = ({ route }: any) => {
  const { id } = route?.params || {};

  const { data: account } = useGetAccountInfoQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const notify = useNotify();
  const isRequiredEmail = useRef(account?.email ? true : false);
  const initialForm = {
    username: account?.username ?? '',
    password: '',
    email: account?.email ?? '',
    roleIds: account?.accountRoles?.[0]?.role?.id,
    isActive: account?.isActive ? 1 : 2,
  };

  const [updateInfoAccount, { isLoading }] = useUpdateAccountMutation();

  const handleWhenUpdateSuccess = () => {
    dispatch(baseAPI.util.invalidateTags([tagTypes.Account]));
    navigation.goBack();
  };

  const openSuccessModal = () => {
    notify.open({
      title: 'Update Account',
      content: 'Account updated successfully',
      duration: 5000,
      onDone: () => handleWhenUpdateSuccess(),
      closeOnPressWrapper: true,
    });
  };

  const onConfirm = (values: typeof initialForm) => {
    const dataBody: UpdateAccountBody = {
      id: id,
      body: {
        username: values.username,
        ...(values?.password && { password: values.password }),
        isActive: values.isActive === 1 ? true : false,
        roleIds: [Number(values.roleIds)],
        ...(values?.email && { email: values.email }),
      },
    };

    updateInfoAccount(dataBody)
      .then(res => {
        const { data, error } = res || {};
        console.log(data);
        if (!error) {
          openSuccessModal();
        } else {
          const message = (error as ErrorAPI)?.data?.message;
          Toast.show({
            type: 'error',
            text1: message,
          });
        }
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'An error occurred, please try again.',
        });
      });
  };

  const validationSchema = Yup.object().shape({
    username: validateSchema.username,
    roleIds: Yup.string().trim().required('Please select your role'),
    email: isRequiredEmail?.current
      ? validateSchema.email.required('The email address cannot be left blank.')
      : validateSchema.email,
  });

  return (
    <Formik initialValues={initialForm} onSubmit={onConfirm} validationSchema={validationSchema}>
      {({ values, setFieldTouched, setFieldValue, errors, handleSubmit, touched }) => {
        const isRequired = checkIsRequired(validationSchema);
        const getHandleChangeByName = (name: string) => {
          switch (name) {
            case 'roleIds': {
              return (v: any) => {
                setFieldValue(name, v);
              };
            }
            case 'isActive':
              return (v: any) => {
                setFieldValue(name, v);
              };
            default:
              return (v: any) => {
                setFieldTouched(name, true);
                setFieldValue(name, v);
              };
          }
        };

        // NOTE: this functions for creating a from props quickly, to re-use easly
        const getFormProps = (name: keyof typeof initialForm) => {
          return {
            isRequired: isRequired(name),
            value: values[name] as any,
            error: touched[name] ? errors[name] : '',
            onChange: getHandleChangeByName(name),
          };
        };

        const { data: rolesData } = useGetRolesQuery({});
        const roles = rolesData?.data;
        const rolesOption = roles?.map(role => ({
          value: role?.id,
          label: role?.name,
        }));

        return (
          <MainLayout title="Update Account" back={<MainLayout.BackToPreviousButton />}>
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
              <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
                <View marginVertical={20} gap={4}>
                  <View gap={12}>
                    <TextInput
                      label="Username"
                      placeholder="Enter username"
                      {...getFormProps('username')}
                    />
                    <TextInput
                      label="Password"
                      placeholder="Enter password"
                      {...getFormProps('password')}
                      disabled
                    />
                    <SelectBox
                      label="Role"
                      placeholder="Select a role"
                      searchPlaceholder="Enter role name"
                      searchLabel="Role name"
                      options={rolesOption}
                      {...getFormProps('roleIds')}
                    />
                    <TextInput label="Email" placeholder="Enter email" {...getFormProps('email')} />
                    <SelectBox
                      label="Status"
                      searchPlaceholder="Enter status name"
                      searchLabel="Status name"
                      placeholder="Select a status"
                      options={statusOptions}
                      {...getFormProps('isActive')}
                    />
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
            <View style={styles.containerButton}>
              <Button
                title="Create"
                loading={isLoading}
                disabled={isLoading}
                onPress={() => handleSubmit()}
              />
            </View>
          </MainLayout>
        );
      }}
    </Formik>
  );
};

export default UpdateInfoAccount;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: 16,
    padding: 16,
    paddingTop: 0,
  },
  containerButton: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 32,
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'flex-start',
    height: 42,
    paddingHorizontal: 16,
    backgroundColor: colors.primary.c500,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
