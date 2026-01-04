/* eslint-disable react-hooks/rules-of-hooks */
import { Button, TextInput, View } from '@components';
import SelectBox from '@components/common/select-box';
import MainLayout from '@components/layout/main-layout';
import { useNotify } from '@hooks/useNotify';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '@redux/store';
import { baseAPI, tagTypes } from '@services/baseAPI';
import { useGetEmployeesNoPaginationQuery } from '@services/employee';
import { useCreateLeaveBalanceMutation } from '@services/leave';
import colors from '@utils/constants/colors';
import { yearsOptions } from '@utils/constants/form';
import { checkIsRequired } from '@utils/helpers/form.helper';
import { CreateLeaveBalanceBody } from '@utils/types/leave.type';
import { ErrorAPI } from '@utils/types/other.type';
import validateSchema from '@utils/validations';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

const CreateLeaveBalance = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const notify = useNotify();
  const initialForm = {
    employeeId: '',
    year: dayjs().year().toString(),
    totalHours: '',
  };

  const [createLeaveBalance, { isLoading }] = useCreateLeaveBalanceMutation();

  const handleWhenCreateSuccess = () => {
    dispatch(baseAPI.util.invalidateTags([tagTypes.Leave]));
    navigation.goBack();
  };

  const openSuccessModal = () => {
    notify.open({
      title: 'Create Leave Balance',
      content: 'New leave balance created successfully',
      duration: 5000,
      onDone: () => handleWhenCreateSuccess(),
      closeOnPressWrapper: true,
    });
  };

  const onConfirm = (values: typeof initialForm) => {
    const dataBody: CreateLeaveBalanceBody = {
      employeeId: Number(values.employeeId),
      year: Number(values.year),
      totalHours: Number(values.totalHours),
    };
    createLeaveBalance(dataBody)
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
    employeeId: Yup.string().trim().required('Please select Employee'),
    totalHours: validateSchema.totalHours,
  });

  return (
    <Formik initialValues={initialForm} onSubmit={onConfirm} validationSchema={validationSchema}>
      {({ values, setFieldTouched, setFieldValue, errors, handleSubmit, touched }) => {
        const isRequired = checkIsRequired(validationSchema);
        const getHandleChangeByName = (name: string) => {
          switch (name) {
            case 'employeeId':
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

        const getFormProps = (name: keyof typeof initialForm) => {
          return {
            isRequired: isRequired(name),
            value: values[name] as any,
            error: touched[name] ? errors[name] : '',
            onChange: getHandleChangeByName(name),
          };
        };

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
          <MainLayout title="Create Leave Balance" back={<MainLayout.BackToPreviousButton />}>
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
                    <SelectBox
                      label="Employee"
                      placeholder="Select a employee"
                      searchPlaceholder="Enter employee name"
                      searchLabel="Employee name"
                      options={employeeOptions}
                      {...getFormProps('employeeId')}
                    />
                    <SelectBox
                      label="Year"
                      placeholder="Select a year"
                      searchPlaceholder="Enter year"
                      searchLabel="Year"
                      options={yearsOptions}
                      {...getFormProps('year')}
                    />
                    <TextInput
                      label="Total hours (unit: hour)"
                      placeholder="Enter totalHours"
                      inputMode="numeric"
                      {...getFormProps('totalHours')}
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

export default CreateLeaveBalance;

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
