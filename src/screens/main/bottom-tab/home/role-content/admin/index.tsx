import { View } from '@components';
import MainLayout from '@components/layout/main-layout';
import ProfileInfoHeader from '@components/ui/profile-info-header';
import HeaderAction from '@components/ui/header-action';
import ManagementItem from '@components/ui/management-item';
import { AdminRoutes, MainRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { nanoid } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import React from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';

enum ManagementType {
  ACCOUNT = 'account',
  EMPLOYEE = 'employee',
}

const managementOptions = [
  {
    id: '1',
    title: 'Account Management',
    time: dayjs().format('DD/MM/YYYY'),
    type: ManagementType.ACCOUNT,
  },
  {
    id: '2',
    title: 'Employee Management',
    time: dayjs().format('DD/MM/YYYY'),
    type: ManagementType.EMPLOYEE,
  },
];

const AdminHome = () => {
  const navigation = useNavigation<any>();
  const goScreenEmployeeManagemant = () => {
    navigation.navigate(MainRoutes.MAIN_ADMIN, {
      screen: AdminRoutes.ADMIN_MANAGE_EMPLOYEE,
    });
  };
  const goScreenAccountManagement = () => {
    navigation.navigate(MainRoutes.MAIN_ADMIN, {
      screen: AdminRoutes.ADMIN_MANAGE_ACCOUNT,
    });
  };

  const handleManagement = (type: string) => {
    switch (type) {
      case ManagementType.EMPLOYEE:
        goScreenEmployeeManagemant();
        break;
      case ManagementType.ACCOUNT:
        goScreenAccountManagement();
        break;
      default:
        break;
    }
  };
  return (
    <MainLayout title="Staff Wise" headerChildren={<ProfileInfoHeader />}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderAction title="Management" onActionPress={() => {}} />
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={managementOptions}
              keyExtractor={item => `${item.id + nanoid()}`}
              horizontal
              renderItem={({ item }) => (
                <ManagementItem item={item} onPress={() => handleManagement(item.type)} />
              )}
              contentContainerStyle={{
                gap: 16,
              }}
            />
          </View>
          <View height={32}>
            <></>
          </View>
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
