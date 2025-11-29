import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MainLayout from '@components/layout/main-layout';
import { Button } from '@components';
import { AddIcon } from '@assets';
import { useNavigation } from '@react-navigation/native';
import { StaffRoutes } from '@navigation/routes';

const LeaveStatus = () => {
  const navigation = useNavigation<any>();
  const onAdditionalLeave = () => {
    navigation.navigate(StaffRoutes.ADDITIONAL_LEAVE);
  };
  return (
    <MainLayout
      back={<MainLayout.BackToPreviousButton />}
      title="Leave Status"
      next={
        <Button.IconButton
          icon={<AddIcon width={25} height={25} viewBox="0 0 30 30" />}
          onPress={onAdditionalLeave}
        />
      }
    >
      <View style={styles.container}>
        <Text>Leave Status</Text>
      </View>
    </MainLayout>
  );
};

export default LeaveStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
