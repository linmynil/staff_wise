/* eslint-disable react-hooks/rules-of-hooks */
import { Button, TextInput, View } from '@components';
import MultipleSelect from '@components/common/multiple-select';
import SelectBox from '@components/common/select-box';
import MainLayout from '@components/layout/main-layout';
import { useNotify } from '@hooks/useNotify';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '@redux/store';
import { baseAPI, tagTypes } from '@services/baseAPI';
import { useGetEmployeesNoPaginationQuery } from '@services/employee';
import { useCreateLeaveBalanceRefillMutation } from '@services/leave';
import colors from '@utils/constants/colors';
import { carryOverOptions, yearsOptions } from '@utils/constants/form';
import { checkIsRequired } from '@utils/helpers/form.helper';
import { CreateLeaveBalanceRefillBody } from '@utils/types/leave.type';
import { ErrorAPI } from '@utils/types/other.type';
import validateSchema from '@utils/validations';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

const CreateLeaveBalanceRefill = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const notify = useNotify();
  const initialForm = {
    year: dayjs().year().toString(),
    defaultTotalHours: '96',
    carryOver: 'false',
    maxCarryOverHours: '',
    employeeIds: [],
  };

  const [createLeaveBalanceRefill, { isLoading }] = useCreateLeaveBalanceRefillMutation();

  const handleWhenCreateSuccess = () => {
    dispatch(baseAPI.util.invalidateTags([tagTypes.Leave]));
    navigation.goBack();
  };

  const openSuccessModal = () => {
    notify.open({
      title: 'Create Leave Balance Refill',
      content: 'New leave balance refill created successfully',
      duration: 5000,
      onDone: () => handleWhenCreateSuccess(),
      closeOnPressWrapper: true,
    });
  };

  const onConfirm = (values: typeof initialForm) => {
    const dataBody: CreateLeaveBalanceRefillBody = {
      year: Number(values.year),
      defaultTotalHours: Number(values.defaultTotalHours),
      carryOver: values.carryOver === 'true' ? true : false,
      ...(values.carryOver === 'true' && { maxCarryOverHours: Number(values.maxCarryOverHours) }),
      employeeIds: values.employeeIds?.map(e => Number(e)),
    };
    createLeaveBalanceRefill(dataBody)
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
    employeeIds: Yup.array()
      .of(Yup.string().required())
      .min(1, 'Please select Employee')
      .required('Please select Employee'),
    defaultTotalHours: validateSchema.totalHours,
    maxCarryOverHours: Yup.number().when('carryOver', {
      is: 'true',
      then: schema => schema.required('Max carry over hours is required'),
      otherwise: schema => schema.notRequired(),
    }),
  });

  return (
    <Formik initialValues={initialForm} onSubmit={onConfirm} validationSchema={validationSchema}>
      {({ values, setFieldTouched, setFieldValue, errors, handleSubmit, touched }) => {
        const isRequired = checkIsRequired(validationSchema);
        const getHandleChangeByName = (name: string) => {
          switch (name) {
            case 'employeeIds':
              return (v: any) => {
                setFieldValue(name, v);
              };
            case 'carryOver':
              return (v: any) => {
                setFieldValue(name, v);
                setFieldValue('maxCarryOverHours', '', false);
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

        return (
          <MainLayout
            title="Create Leave Balance Refill"
            back={<MainLayout.BackToPreviousButton />}
          >
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
                      label="Year"
                      placeholder="Select a year"
                      searchPlaceholder="Enter year"
                      searchLabel="Year"
                      options={yearsOptions}
                      {...getFormProps('year')}
                    />
                    <TextInput
                      label="Total hours (unit: hour)"
                      placeholder="Enter total hours"
                      inputMode="numeric"
                      {...getFormProps('defaultTotalHours')}
                    />
                    <SelectBox
                      label="Carry over balance"
                      searchPlaceholder="Enter carry over balance"
                      searchLabel="Carry over balance"
                      placeholder="Select a carry over balance"
                      options={carryOverOptions}
                      {...getFormProps('carryOver')}
                    />
                    {values.carryOver === 'true' && (
                      <TextInput
                        label="Max carry over hours (unit: hour)"
                        placeholder="Enter max carry over hours"
                        inputMode="numeric"
                        {...getFormProps('maxCarryOverHours')}
                      />
                    )}

                    <MultipleSelect
                      title={'List employees'}
                      searchLabel={'Search employee'}
                      searchPlaceholder={'Enter name employee'}
                      options={employeeOptions}
                      maxCount={1}
                      {...getFormProps('employeeIds')}
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

export default CreateLeaveBalanceRefill;

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
  title: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
