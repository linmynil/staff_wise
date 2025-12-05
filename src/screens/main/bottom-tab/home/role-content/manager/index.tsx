
import MainLayout from '@components/layout/main-layout';
import ProfileInfo from '@components/ui/proflie-info';
import { MainRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { ProfileResponse, Role } from '@utils/types/profile.type';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderAction from '@components/ui/header-action';
import { ArrowRightIcon } from '@assets';
import HorizontalList from '@components/ui/horizontal-list';
const profileDefault: ProfileResponse = {
  id: 1,
  name: 'Mỹ Linh',
  position: Role.MANAGER,
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
const ManagerHome = () => {
  const navigation = useNavigation<any>();
  const onLeaveStatus = () => {
    navigation.navigate(MainRoutes.MANAGER);
  };
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
