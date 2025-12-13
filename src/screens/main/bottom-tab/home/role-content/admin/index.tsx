import { View } from '@components';
import MainLayout from '@components/layout/main-layout';
import AccountInfoHeader from '@components/ui/account-info-header';
import HeaderAction from '@components/ui/header-action';
import ManagementItem from '@components/ui/management-item';
import { useGetAccountInfo } from '@hooks';
import { AdminRoutes, MainRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { nanoid } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import React from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';

enum ManagementType {
  LEAVE = 'leave',
  EMPLOYEE = 'employee',
}

const menuData2 = [
  {
    id: '1',
    title: 'Quản lý nhân viên',
    time: dayjs().format('DD/MM/YYYY'),
    type: ManagementType.EMPLOYEE,
  },
];

const AdminHome = () => {
  const accountInfo = useGetAccountInfo();
  const navigation = useNavigation<any>();
  const goScreenManageEmployee = () => {
    navigation.navigate(MainRoutes.MAIN_ADMIN, {
      screen: AdminRoutes.ADMIN_MANAGE_EMPLOYEE,
    });
  };

  const handleManagement = (type: string) => {
    switch (type) {
      case ManagementType.EMPLOYEE:
        goScreenManageEmployee();
        break;
      default:
        break;
    }
  };
  return (
    <MainLayout
      title="Staff Wise"
      headerChildren={<AccountInfoHeader account={accountInfo} />}
    >
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderAction title="Management" onActionPress={() => {}} />
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={menuData2}
              keyExtractor={item => `${item.id + nanoid()}`}
              horizontal
              renderItem={({ item }) => (
                <ManagementItem
                  item={item}
                  onPress={() => handleManagement(item.type)}
                />
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
