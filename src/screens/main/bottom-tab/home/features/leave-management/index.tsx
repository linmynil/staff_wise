import { UserIdIcon } from '@assets';
import { View } from '@components';
import MainLayout from '@components/layout/main-layout';
import FeatureItem from '@components/ui/feature-item';
import { HomeRoutes, MainRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native';

const ManageLeave = () => {
  const navigation = useNavigation<any>();

  return (
    <MainLayout back={<MainLayout.BackToPreviousButton />} title="Manage Leave">
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View flex={1} gap={12} paddingHorizontal={16} paddingVertical={24}>
          <FeatureItem
            icon={<UserIdIcon />}
            title={'Create Leave Balance'}
            description={'Create leave balance for an employee'}
            onPress={() => {
              navigation.navigate(MainRoutes.MAIN_HOME, {
                screen: HomeRoutes.HOME_CREATE_LEAVE_BALANCE,
              });
            }}
          />
          <FeatureItem
            icon={<UserIdIcon />}
            title={'Create Leave Balance Refill'}
            description={'Create leave balance for all or specific employees for a new year'}
            onPress={() => {
              navigation.navigate(MainRoutes.MAIN_HOME, {
                screen: HomeRoutes.HOME_CREATE_LEAVE_BALANCE_REFILL,
              });
            }}
          />
          <FeatureItem
            icon={<UserIdIcon />}
            title={'Create Leave Balance Bonus'}
            description={'Add bonus leave hours to specific employees'}
            onPress={() => {
              navigation.navigate(MainRoutes.MAIN_HOME, {
                screen: HomeRoutes.HOME_CREATE_LEAVE_BALANCE_BONUS,
              });
            }}
          />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default ManageLeave;
