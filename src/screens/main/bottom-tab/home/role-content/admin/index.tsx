import { Button } from '@components';
import MainLayout from '@components/layout/main-layout';
import ProfileInfo from '@components/ui/proflie-info';
import { MainRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '@redux/selectors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const AdminHome = () => {
  const accountInfo = useAppSelector(state => state.account.accountInfo)
  const navigation = useNavigation<any>();
  const onLeaveStatus = () => {
    navigation.navigate(MainRoutes.ADMIN);
  };
  return (
    <MainLayout
      title="Staff Wise"
      headerChildren={<ProfileInfo profile={accountInfo} />}
    >
      <View style={styles.container}>
        <Text>AdminHome</Text>
        <Button title="Leave status" onPress={onLeaveStatus} />
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
