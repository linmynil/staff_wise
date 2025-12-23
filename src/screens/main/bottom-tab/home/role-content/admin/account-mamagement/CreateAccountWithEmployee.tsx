/* eslint-disable react-hooks/rules-of-hooks */
import { Button, TextInput, View } from '@components';
import SelectBox from '@components/common/select-box';
import MainLayout from '@components/layout/main-layout';
import { useNotify } from '@hooks/useNotify';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '@redux/store';
import { useCreateAccountWithEmployeeMutation } from '@services/account';
import { baseAPI, tagTypes } from '@services/baseAPI';
import { useGetEmployeesNoPaginationQuery } from '@services/employee';
import { useGetRolesQuery } from '@services/role';
import colors from '@utils/constants/colors';
import { checkIsRequired } from '@utils/helpers/form.helper';
import { CreateAccountWithEmployeeBody } from '@utils/types/account.type';
import { ErrorAPI } from '@utils/types/other.type';
import validateSchema from '@utils/validations';
import { Formik } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

const CreateAccountWithEmployee = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const notify = useNotify();
  const initialForm = {
    username: '',
    password: '123456',
    fullName: '',
    email: '',
    employeeCode: '',
    phone: '',
    department: '',
    position: '',
    roleIds: '',
    managerId: '',
  };

  const [createAccountWithEmployee, { isLoading }] = useCreateAccountWithEmployeeMutation();

  const handleWhenCreateSuccess = () => {
    dispatch(baseAPI.util.invalidateTags([tagTypes.Account]));
    navigation.goBack();
  };

  const openSuccessModal = () => {
    notify.open({
      title: 'Create Account',
      content: 'New account created successfully',
      duration: 5000,
      onDone: () => handleWhenCreateSuccess(),
      closeOnPressWrapper: true,
    });
  };

  const onConfirm = (values: typeof initialForm) => {
    const dataBody: CreateAccountWithEmployeeBody = {
      username: values.username,
      password: values.password,
      fullName: values.fullName,
      roleIds: [Number(values.roleIds)],
      ...(values?.email && { email: values.email }),
      ...(values?.employeeCode && { employeeCode: values.employeeCode }),
      ...(values?.phone && { phone: values.phone }),
      ...(values?.department && { department: values.department }),
      ...(values?.position && { position: values.position }),
      ...(values?.managerId && { managerId: Number(values.managerId) }),
    };

    createAccountWithEmployee(dataBody)
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
    password: validateSchema.password,
    fullName: Yup.string().trim().required('Please enter your full name'),
    roleIds: Yup.string().trim().required('Please select your role'),
    email: validateSchema.email,
    phone: validateSchema.phone,
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
            case 'managerId':
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

        const { data: employees } = useGetEmployeesNoPaginationQuery({});
        const employeeOptions = employees?.map(employee => ({
          value: employee?.id?.toString(),
          label: `${employee?.fullName} ${
            employee?.employeeCode ? `- ${employee?.employeeCode}` : ''
          }`,
        }));

        employeeOptions?.unshift({
          value: '',
          label: 'Select...',
        });

        return (
          <MainLayout title="Create Account" back={<MainLayout.BackToPreviousButton />}>
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
                      label="Full name"
                      placeholder="Enter full name"
                      {...getFormProps('fullName')}
                    />
                    <TextInput
                      label="Password"
                      placeholder="Enter password"
                      {...getFormProps('password')}
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
                    <TextInput
                      label="Employee Code"
                      placeholder="Enter employee code"
                      {...getFormProps('employeeCode')}
                    />
                    <TextInput
                      label="Phone"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="Enter phone"
                      {...getFormProps('phone')}
                    />
                    <TextInput
                      label="Department"
                      placeholder="Enter department"
                      {...getFormProps('department')}
                    />
                    <TextInput
                      label="Position"
                      placeholder="Enter position"
                      {...getFormProps('position')}
                    />
                    <SelectBox
                      label="Manager"
                      placeholder="Select a manager"
                      searchPlaceholder="Enter manager name"
                      searchLabel="Manager name"
                      options={employeeOptions}
                      {...getFormProps('managerId')}
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

export default CreateAccountWithEmployee;

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
