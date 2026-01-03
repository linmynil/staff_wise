import { CameraMini, PenEdit } from '@assets';
import { Button, Text, View } from '@components';
import Divider from '@components/common/divider';
import MainLayout from '@components/layout/main-layout';
import Row from '@components/ui/row';
import { HomeRoutes, MainRoutes } from '@navigation/routes';
import { useGetEmployeeDetailQuery } from '@services/employee';
import colors from '@utils/constants/colors';
import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';

const EmployeeDetail = ({ navigation, route }: any) => {
  const { id } = route?.params || {};

  const { data: employee } = useGetEmployeeDetailQuery(id, {
    skip: !id,
  });

  console.log(employee);

  const navigateUpdateEmployeeInfo = () => {
    navigation.getParent().navigate(MainRoutes.MAIN_HOME, {
      screen: HomeRoutes.HOME_UPDATE_INFO_EMPLOYEE,
      params: {
        id: id,
      },
    });
  };
  return (
    <MainLayout
      back={<MainLayout.BackToPreviousButton />}
      title="Employee Infomation"
      next={
        <Button.IconButton
          icon={<PenEdit width={25} height={25} color={colors.white} viewBox="0 0 20 20" />}
          onPress={navigateUpdateEmployeeInfo}
        />
      }
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View center gap={8}>
            <View>
              <Image
                style={styles.img_profile}
                source={require('@assets/images/avatar-default.png')}
                onError={() => {}}
              />
              <Button.DefaultButton style={styles.camera_icon} onPress={() => {}}>
                <CameraMini />
              </Button.DefaultButton>
            </View>
          </View>
          <View marginVertical={20} gap={4}>
            <View row space_between center>
              <Text
                size={16}
                weight={600}
                color={colors.neutral.c900}
                style={{ width: '100%', textAlign: 'center' }}
              >
                General Employee Infomation
              </Text>
            </View>
            <View style={styles.info_container}>
              <Row title={'Username'} value={employee?.fullName} />
              <Divider />
              <Row title={'Department'} value={employee?.department} />
              <Divider />
              <Row title={'Phone'} value={employee?.phone} />
              <Divider />
              <Row title={'Employee Code'} value={employee?.employeeCode} />
            </View>
          </View>
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
    paddingTop: 16,
  },
  img_profile: {
    width: 64,
    height: 64,
    borderRadius: 64,
  },
  camera_icon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    padding: 4,
    borderRadius: 16,
  },
  info_container: {
    borderRadius: 12,
    backgroundColor: colors.white,
    marginVertical: 10,
    paddingVertical: 4,
    shadowColor: colors.blue.c500,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
