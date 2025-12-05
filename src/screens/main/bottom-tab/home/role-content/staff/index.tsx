import MainLayout from '@components/layout/main-layout';
import ProfileInfo from '@components/ui/proflie-info';
import HorizontalList from '@components/ui/horizontal-list';
import HorizontalSelectList from '@components/ui/horizontal-select-list';
import HeaderAction from '@components/ui/header-action';
import { MainRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { ProfileResponse, Role } from '@utils/types/profile.type';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {ArrowRightIcon } from '@assets';

const profileDefault: ProfileResponse = {
  id: 1,
  name: 'Mỹ Linh',
  position: Role.STAFF,
  avatar: '',
};

const menuData = [
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


const StaffHome = () => {
  const navigation = useNavigation<any>();
  const onLeaveStatus = () => {
    navigation.navigate(MainRoutes.STAFF);
  };
  const menuData2 = [
  {
    id: "1",
    title: "Quản lý nghỉ phép",
    time: "07/03/2025",
    onPress:()=> {onLeaveStatus}
  },
  {
    id: "2",
    title: "Quản lý nhân viên",
    time: "12/11/2025",
    onPress:()=> {onLeaveStatus}
  },
];
  return (
    <MainLayout
      title="Staff Wise"
      headerChildren={<ProfileInfo profile={profileDefault} />}
    >
      <View style={styles.container}>     
        <HeaderAction
          title="Dashboard"
          actionLabel="Leave Status"
          icon={<ArrowRightIcon width={11} height={11} viewBox="0 0 11 11" />}
          onActionPress={onLeaveStatus}
        />
        <HorizontalList data={menuData} />;
        <HorizontalSelectList data={menuData2} />;
      </View>
    </MainLayout>
  );
};

export default StaffHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
