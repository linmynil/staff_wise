/* eslint-disable react-hooks/rules-of-hooks */
import { Button, TextInput, View } from '@components';
import SelectBox from '@components/common/select-box';
import MainLayout from '@components/layout/main-layout';
import { useNotify } from '@hooks/useNotify';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '@redux/store';
import { baseAPI, tagTypes } from '@services/baseAPI';
import {
  useGetEmployeesNoPaginationQuery,
  useUpdateEmployeeMutation,
  useGetEmployeeDetailQuery,
} from '@services/employee';
import colors from '@utils/constants/colors';
import { checkIsRequired } from '@utils/helpers/form.helper';
import { UpdateEmployeeBody } from '@utils/types/employee.type';
import { ErrorAPI } from '@utils/types/other.type';
import { Formik } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

const UpdateInfoEmployee = ({ route }: any) => {
  const { id } = route?.params || {};
  const { data: employee } = useGetEmployeeDetailQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const notify = useNotify();
  const initialForm = {
    employeeCode: employee?.employeeCode ?? '',
    fullName: employee?.fullName ?? '',
    phone: employee?.phone ?? '',
    department: employee?.department ?? '',
    position: employee?.position ?? '',
    managerId: employee?.managerId ? employee?.manager?.id?.toString() : '',
  };

  const [updateInfoEmployee, { isLoading }] = useUpdateEmployeeMutation();

  const handleWhenUpdateSuccess = () => {
    dispatch(baseAPI.util.invalidateTags([tagTypes.Employee]));
    navigation.goBack();
  };

  const openSuccessModal = () => {
    notify.open({
      title: 'Update Employee',
      content: 'Employee updated successfully',
      duration: 5000,
      onDone: () => handleWhenUpdateSuccess(),
      closeOnPressWrapper: true,
    });
  };

  const onConfirm = (values: typeof initialForm) => {
    const dataBody: UpdateEmployeeBody = {
      id: id,
      body: {
        ...(values.employeeCode && { employeeCode: values.employeeCode }),
        ...(values.fullName && { fullName: values.fullName }),
        ...(values.phone && { phone: values.phone }),
        ...(values.department && { department: values.department }),
        ...(values.position && { position: values.position }),
        ...(values.managerId && { managerId: Number(values.managerId) }),
      },
    };
    updateInfoEmployee(dataBody)
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

  const validationSchema = Yup.object().shape({});

  return (
    <Formik initialValues={initialForm} onSubmit={onConfirm} validationSchema={validationSchema}>
      {({ values, setFieldTouched, setFieldValue, errors, handleSubmit, touched }) => {
        const isRequired = checkIsRequired(validationSchema);
        const getHandleChangeByName = (name: string) => {
          switch (name) {
            case 'managerId': {
              return (v: any) => {
                setFieldValue(name, v);
              };
            }
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

        const { data: employees } = useGetEmployeesNoPaginationQuery({});
        const employeeOptions = employees?.map(e => ({
          value: e?.id?.toString(),
          label: `${e?.fullName} ${e?.employeeCode ? `- ${e?.employeeCode}` : ''}`,
        }));

        employeeOptions?.unshift({
          value: '',
          label: 'Select...',
        });

        return (
          <MainLayout title="Update Employee" back={<MainLayout.BackToPreviousButton />}>
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
                      label="Employee Code"
                      placeholder="Enter employee Code"
                      {...getFormProps('employeeCode')}
                    />
                    <TextInput
                      label="Fullname"
                      placeholder="Enter fullname"
                      {...getFormProps('fullName')}
                    />
                    <TextInput label="Phone" placeholder="Enter phone" {...getFormProps('phone')} />
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
                title="Update"
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

export default UpdateInfoEmployee;
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
