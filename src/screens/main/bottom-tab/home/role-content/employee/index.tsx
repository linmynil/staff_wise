import { ArrowRightIcon } from '@assets';
import { View } from '@components';
import MainLayout from '@components/layout/main-layout';
import ProfileInfoHeader from '@components/ui/profile-info-header';
import DashboardItem, { Dashboard } from '@components/ui/dashboard-item';
import HeaderAction from '@components/ui/header-action';
import ManagementItem from '@components/ui/management-item';
import { MainRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';

const menuData: Dashboard[] = [
  {
    id: '1',
    typeDate: 'Annual',
    date: '7',
    totalDate: '12',
  },
  {
    id: '2',
    typeDate: 'Holidays',
    date: '3',
    totalDate: '3',
  },
];

enum ManagementType {
  LEAVE = 'leave',
  EMPLOYEE = 'employee',
}

const menuData2 = [
  {
    id: '1',
    title: 'Quản lý nghỉ phép',
    time: '07/03/2025',
    type: ManagementType.LEAVE,
  },
  {
    id: '2',
    title: 'Quản lý nhân viên',
    time: '12/11/2025',
    type: ManagementType.EMPLOYEE,
  },
];

const EmployeeHome = () => {
  const navigation = useNavigation<any>();

  const onLeaveStatus = () => {
    navigation.navigate(MainRoutes.MAIN_EMPLOYEE);
  };

  const handleManagement = (type: string) => {
    switch (type) {
      case ManagementType.LEAVE:
        console.log('leave');
        break;
      case ManagementType.EMPLOYEE:
        console.log('staff');
        break;
      default:
        break;
    }
  };

  return (
    <MainLayout title="Staff Wise" headerChildren={<ProfileInfoHeader />}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderAction
            title="Dashboard"
            actionLabel="Leave Status"
            icon={<ArrowRightIcon width={11} height={11} viewBox="0 0 11 11" />}
            onActionPress={onLeaveStatus}
          />

          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
              gap: 16,
            }}
          >
            {menuData?.map(item => (
              <DashboardItem key={`${item.id + nanoid()}`} item={item} />
            ))}
          </View>

          <HeaderAction title="Management" onActionPress={onLeaveStatus} />
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={menuData2}
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

export default EmployeeHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
