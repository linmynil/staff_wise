import { Button, Text, TextInput, View } from '@components';
import DatePicker from '@components/common/date-picker';
import SelectBox from '@components/common/select-box';
import TimePicker from '@components/common/time-picker';
import MainLayout from '@components/layout/main-layout';
import { useNotify } from '@hooks/useNotify';
import { HomeRoutes, MainRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '@redux/store';
import { baseAPI, tagTypes } from '@services/baseAPI';
import { useCreateLeaveRequestsMutation } from '@services/leave';

import colors from '@utils/constants/colors';
import { fullDayOptions, leaveTypeOptions } from '@utils/constants/leave';
import { checkIsRequired } from '@utils/helpers/form.helper';
import { CreateLeaveRequests } from '@utils/types/leave.type';
import { ErrorAPI } from '@utils/types/other.type';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

const ApplyLeave = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const setFieldErrorRef = useRef<(field: string, message: string | undefined) => void>(() => {});
  const resetFormRef = useRef<(() => void) | null>(null);
  const notify = useNotify();
  const initialForm = {
    startDate: '',
    endDate: '',
    isFullDay: '',
    startTime: '',
    endTime: '',
    leaveType: '',
    reason: '',
  };

  const [createLeaveRequest, { isLoading }] = useCreateLeaveRequestsMutation();

  const handleWhenCreateSuccess = () => {
    dispatch(baseAPI.util.invalidateTags([tagTypes.Leave]));
    navigation.getParent().navigate(MainRoutes.MAIN_HOME, {
      screen: HomeRoutes.LEAVE_STATUS,
    });
  };

  const openSuccessModal = () => {
    notify.open({
      title: 'Create Apply Leave',
      content: 'Apply leave created successfully',
      duration: 5000,
      onDone: () => handleWhenCreateSuccess(),
      closeOnPressWrapper: true,
    });
  };

  const onConfirm = (values: typeof initialForm) => {
    const startDate = dayjs(values.startDate);
    const endDate = dayjs(values.endDate);

    if (values.isFullDay === 'false') {
      if (startDate.isSame(endDate, 'day')) {
        const startTime = dayjs(values.startTime, 'HH:mm');
        const endTime = dayjs(values.endTime, 'HH:mm');

        if (!endTime.isAfter(startTime)) {
          Toast.show({
            type: 'error',
            text1: 'End time must be after start time',
          });
          setFieldErrorRef.current('startTime', 'End time must be after start time');
          setFieldErrorRef.current('endTime', 'End time must be after start time');
          return;
        }
      }
    }

    const dataBody: CreateLeaveRequests = {
      startDate: values.startDate,
      endDate: values.endDate,
      ...(values?.isFullDay && { isFullDay: values.isFullDay === 'true' ? true : false }),
      ...(values?.startTime && values.isFullDay === 'false' && { startTime: values.startTime }),
      ...(values?.endTime && values.isFullDay === 'false' && { endTime: values.endTime }),
      ...(values?.leaveType && { leaveType: values.leaveType }),
      ...(values?.reason && { reason: values.reason }),
    };
    createLeaveRequest(dataBody)
      .then(res => {
        const { data, error } = res || {};
        console.log(data);

        if (!error) {
          resetFormRef.current?.();
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
    startDate: Yup.string().trim().required('Please select start day'),
    endDate: Yup.string().trim().required('Please select end day'),
    startTime: Yup.string().when('isFullDay', {
      is: (val: string) => val === 'false',
      then: schema => schema.trim().required('Please select start time'),
      otherwise: schema => schema.notRequired(),
    }),

    endTime: Yup.string().when('isFullDay', {
      is: (val: string) => val === 'false',
      then: schema => schema.trim().required('Please select end time'),
      otherwise: schema => schema.notRequired(),
    }),
  });

  return (
    <Formik initialValues={initialForm} onSubmit={onConfirm} validationSchema={validationSchema}>
      {({
        values,
        setFieldTouched,
        setFieldValue,
        setFieldError,
        errors,
        handleSubmit,
        touched,
        resetForm,
      }) => {
        setFieldErrorRef.current = setFieldError;
        resetFormRef.current = resetForm;
        const isRequired = checkIsRequired(validationSchema);
        const getHandleChangeByName = (name: string) => {
          switch (name) {
            case 'isFullDay': {
              return (v: any) => {
                setFieldValue(name, v);
                setFieldValue('startTime', v, false);
                setFieldValue('endTime', v, false);
              };
            }
            case 'leaveType': {
              return (v: any) => {
                setFieldValue(name, v);
              };
            }
            case 'startDate': {
              return (v: any) => {
                setFieldValue(name, v);
                if (dayjs(v).isAfter(values.endDate) || !values.endDate) {
                  setFieldValue('endDate', v, false);
                }
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

        return (
          <MainLayout title="Apply Leave">
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
                    <Text weight={600} size={16}>
                      Leave Application From
                    </Text>
                    <Text>Please provide information about your leave</Text>
                    <SelectBox
                      label="Leave type"
                      searchPlaceholder="Enter leave type"
                      searchLabel="Leave type"
                      placeholder="Select a leave type"
                      options={leaveTypeOptions}
                      {...getFormProps('leaveType')}
                    />
                    <DatePicker
                      placeholder="Select start day"
                      label="Start day"
                      min={dayjs()}
                      {...getFormProps('startDate')}
                    />
                    <DatePicker
                      placeholder="Select end day"
                      disabled={!values.startDate}
                      label="End day"
                      min={values.startDate ? dayjs(values.startDate) : dayjs()}
                      // max={dayjs().add(12, 'days')}
                      {...getFormProps('endDate')}
                    />
                    <SelectBox
                      label="Full day"
                      searchPlaceholder="Enter full day"
                      searchLabel="Full day"
                      placeholder="Select a status"
                      options={fullDayOptions}
                      {...getFormProps('isFullDay')}
                    />
                    {values.isFullDay === 'false' && (
                      <TimePicker
                        placeholder="Select start time"
                        label="Start time"
                        min="08:00"
                        max="17:00"
                        {...getFormProps('startTime')}
                        isRequired
                      />
                    )}
                    {values.isFullDay === 'false' && (
                      <TimePicker
                        placeholder="Select end time"
                        label="End time"
                        min="08:00"
                        max="17:00"
                        {...getFormProps('endTime')}
                        isRequired
                      />
                    )}

                    <TextInput
                      label="Reason"
                      placeholder="Enter reason"
                      {...getFormProps('reason')}
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

export default ApplyLeave;

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
