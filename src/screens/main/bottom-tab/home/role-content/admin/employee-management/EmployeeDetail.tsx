import { PenEdit } from '@assets';
import { Button } from '@components';
import MainLayout from '@components/layout/main-layout';
import { AdminRoutes, MainRoutes } from '@navigation/routes';
import { useGetEmployeeDetailQuery } from '@services/employee';
import colors from '@utils/constants/colors';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const EmployeeDetail = ({ navigation, route }: any) => {
  const { id } = route?.params || {};

  const { data: employee } = useGetEmployeeDetailQuery(id, {
    skip: !id,
  });

  console.log(employee);

  const navigateUpdateEmployeeInfo = () => {
    navigation.getParent().navigate(MainRoutes.MAIN_ADMIN, {
      screen: AdminRoutes.ADMIN_UPDATE_INFO_EMPLOYEE,
      params: {
        id: id,
      },
    });
  };
  return (
    <MainLayout
      back={<MainLayout.BackToPreviousButton />}
      title="Employee Info"
      next={
        <Button.IconButton
          icon={<PenEdit width={25} height={25} color={colors.white} viewBox="0 0 20 20" />}
          onPress={navigateUpdateEmployeeInfo}
        />
      }
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text>Info Employee</Text>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default EmployeeDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
});
