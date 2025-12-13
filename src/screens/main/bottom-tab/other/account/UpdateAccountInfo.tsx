/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Text, TextInput, View } from '@components';
import Divider from '@components/common/divider';
import MultipleSelect, {
  MultipleSelectOption,
} from '@components/common/multiple-select';
import MainLayout from '@components/layout/main-layout';
import { useGetAccountInfo } from '@hooks';
import { useGetRolesQuery } from '@services/role';
import colors from '@utils/constants/colors';
import { checkIsRequired } from '@utils/helpers/form.helper';
import validateSchema from '@utils/validations';
import { Formik } from 'formik';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import * as Yup from 'yup';
import { AvatarUploadable } from './AccountInfo';

const UpdateAccountInfo = () => {
  const account = useGetAccountInfo();
  const accountRoles = account.accountRoles;
  const initialForm = {
    username: '',
    email: '',
    roleIds: [],
  };

  const onConfirm = (values: typeof initialForm) => {
    console.log('values', JSON.stringify(values, null, 2));
  };

  const validationSchema = Yup.object().shape({
    username: validateSchema.username,
    email: validateSchema.email,
    roleIds: Yup.array()
      .of(Yup.number())
      .min(1, 'Please select at least one role')
      .meta({ required: true }),
  });

  return (
    <Formik
      initialValues={initialForm}
      onSubmit={onConfirm}
      validationSchema={validationSchema}
    >
      {({
        values,
        setFieldTouched,
        setFieldValue,
        errors,
        handleSubmit,
        touched,
      }) => {
        const isRequired = checkIsRequired(validationSchema);

        const getHandleChangeByName = (name: string) => {
          switch (name) {
            case 'roleIds': {
              return (v: any) => {
                setFieldValue('roleIds', v);
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

        const { data: rolesRaw, isLoading: isRolesRawLoading } =
          useGetRolesQuery({});
        const roleOptions: MultipleSelectOption[] =
          rolesRaw?.data?.map(role => ({ value: role.id, label: role.name })) ||
          [];

        console.log(errors);

        return (
          <MainLayout
            title="Update Account Info"
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
              <ScrollView style={styles.wrapper}>
                <View center gap={8}>
                  <AvatarUploadable />
                  <Text size={16} color={colors.neutral.c900} weight={600}>
                    {account?.username?.toLocaleUpperCase()}
                  </Text>
                </View>
                <View marginVertical={20} gap={4}>
                  <View row space_between>
                    <Text size={16} weight={600} color={colors.neutral.c900}>
                      General Account Details
                    </Text>
                  </View>
                  <View gap={12}>
                    <TextInput
                      label="Username"
                      placeholder="Enter username"
                      {...getFormProps('username')}
                    />
                    <TextInput
                      label="Email"
                      placeholder="Enter email"
                      {...getFormProps('email')}
                    />
                  </View>
                </View>
                <Divider />
                <View marginVertical={20} gap={4}>
                  <Text size={16} weight={600} color={colors.neutral.c900}>
                    Roles & Permissions
                  </Text>
                  <MultipleSelect
                    title={'Roles'}
                    searchLabel={'Search for roles'}
                    searchPlaceholder={'Enter role name'}
                    options={roleOptions}
                    isLoading={isRolesRawLoading}
                    {...getFormProps('roleIds')}
                  />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
            <View style={styles.containerButton}>
              <Button
                title="Update"
                //   loading={isLoading}
                onPress={() => handleSubmit()}
              />
            </View>
          </MainLayout>
        );
      }}
    </Formik>
  );
};

export default UpdateAccountInfo;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: 16,
    padding: 16,
  },
  img_profile: {
    width: 64,
    height: 64,
    borderRadius: 64,
  },
  camera_icon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    padding: 4,
    borderRadius: 16,
  },
  info_container: {
    borderRadius: 12,
    backgroundColor: colors.white,
    marginVertical: 10,
    paddingVertical: 4,
    shadowColor: colors.blue.c500,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
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
