import { Button } from '@components';
import MainLayout from '@components/layout/main-layout';
import ProfileInfo from '@components/ui/proflie-info';
import { MainRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { ProfileResponse, Role } from '@utils/types/profile.type';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const profileDefault: ProfileResponse = {
  id: 1,
  name: 'Mỹ Linh',
  position: Role.STAFF,
  avatar: '',
};

const StaffHome = () => {
  const navigation = useNavigation<any>();
  const onLeaveStatus = () => {
    navigation.navigate(MainRoutes.STAFF);
  };
  return (
    <MainLayout
      title="Staff Wise"
      headerChildren={<ProfileInfo profile={profileDefault} />}
    >
      <View style={styles.container}>
        <Text>StaffHome</Text>
        <Button title="Leave status" onPress={onLeaveStatus} />
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
