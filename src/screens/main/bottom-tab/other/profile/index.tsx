import { PenEdit } from '@assets';
import { Button, Text, View } from '@components';
import Divider from '@components/common/divider';
import MainLayout from '@components/layout/main-layout';
import AvatarUploadable from '@components/ui/avatar-uploadable';
import Row from '@components/ui/row';
import { useGetAccountInfo, useGetEmployeeInfo } from '@hooks';
import { OtherRoutes } from '@navigation/routes';
import { useAppSelector } from '@redux/store';
import colors from '@utils/constants/colors';
import { AccountInfoView } from '@utils/types/account.type';
import { Role } from '@utils/types/role.type';

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const ProfileInfo = ({ navigation }: any) => {
  const roles = useAppSelector(state => state.auth.roles);
  const isAdmin = roles?.includes(Role.ADMIN);

  const accountInfo = useGetAccountInfo();
  const employeeInfo = useGetEmployeeInfo();

  const info: AccountInfoView | undefined = isAdmin
    ? accountInfo && {
        id: accountInfo?.id,
        username: accountInfo?.username,
        email: accountInfo?.email,
        fullName: accountInfo?.employee?.fullName,
        phone: accountInfo?.employee?.phone,
      }
    : employeeInfo?.account && {
        id: employeeInfo?.account?.id,
        username: employeeInfo?.account?.username,
        email: employeeInfo?.account?.email,
        fullName: employeeInfo?.fullName,
        phone: employeeInfo?.phone,
      };

  return (
    <MainLayout title="Account Information" back={<MainLayout.BackToPreviousButton />}>
      <ScrollView style={styles.wrapper}>
        <View center gap={8}>
          <AvatarUploadable />
          <Text size={16} color={colors.neutral.c900} weight={600}>
            {info?.username?.toLocaleUpperCase()}
          </Text>
        </View>
        <View marginVertical={20} gap={4}>
          <View row space_between>
            <Text size={16} weight={600} color={colors.neutral.c900}>
              General Account Details
            </Text>
            <Button.IconButton
              icon={<PenEdit />}
              onPress={() => {
                navigation.navigate(OtherRoutes.OTHER_UPDATE_ACCOUNT_INFO);
              }}
            />
          </View>
          <View style={styles.info_container}>
            <Row title={'Username'} value={info?.username} />
            <Divider />
            <Row title={'Email'} value={info?.email} />
          </View>
        </View>
        <Divider />
        {/* <View marginVertical={20} gap={4}>
          <Text size={16} weight={600} color={colors.neutral.c900}>
            Roles & Permissions
          </Text>
          {roles?.map(item => {
            const role = item.role;

            return (
              <View key={item.id} style={styles.info_container}>
                <Row title={'Role'} value={role?.name} />
                <Divider />
                <Row title={'Permissions'} value={role?.description} />
              </View>
            );
          })}
        </View> */}
      </ScrollView>
    </MainLayout>
  );
};
export default ProfileInfo;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: 16,
    padding: 16,
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
});
