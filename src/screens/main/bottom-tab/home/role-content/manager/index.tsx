import { ArrowRightIcon } from '@assets';
import MainLayout from '@components/layout/main-layout';
import ProfileInfoHeader from '@components/ui/profile-info-header';
import HeaderAction from '@components/ui/header-action';
import { useGetAccountInfo } from '@hooks';
import { MainRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const ManagerHome = () => {
  const navigation = useNavigation<any>();
  const accountInfo = useGetAccountInfo();
  const onLeaveStatus = () => {
    navigation.navigate(MainRoutes.MAIN_MANAGER);
  };
  return (
    <MainLayout title="Staff Wise" headerChildren={<ProfileInfoHeader account={accountInfo} />}>
      <View style={styles.container}>
        <HeaderAction
          title="Dashboard"
          actionLabel="Leave Status"
          icon={<ArrowRightIcon width={11} height={11} viewBox="0 0 11 11" />}
          onActionPress={onLeaveStatus}
        />
      </View>
    </MainLayout>
  );
};

export default ManagerHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
