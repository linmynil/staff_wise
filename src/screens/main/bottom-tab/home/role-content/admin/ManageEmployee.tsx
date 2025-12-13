import { AddIcon } from '@assets';
import { Button, Text, View } from '@components';
import MainLayout from '@components/layout/main-layout';
import { EmployeeRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import colors from '@utils/constants/colors';
import React from 'react';
import { StyleSheet } from 'react-native';

const ManageEmployee = () => {
  const navigation = useNavigation<any>();
  const onAdditionalLeave = () => {
    navigation.navigate(EmployeeRoutes.EMPLOYEE_ADDITIONAL_LEAVE);
  };

  return (
    <MainLayout
      back={<MainLayout.BackToPreviousButton />}
      title="Manage Employee"
      next={
        <Button.IconButton
          icon={<AddIcon width={25} height={25} viewBox="0 0 30 30" />}
          onPress={onAdditionalLeave}
        />
      }
    >
      <View style={styles.container}>
        <Text>Manage Employee</Text>
      </View>
    </MainLayout>
  );
};

export default ManageEmployee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  title: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
