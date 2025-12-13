import { OtherRoutes } from '@navigation/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePassword from '@screens/auth/change-password';
import AccountInfo from '@screens/main/bottom-tab/other/account/AccountInfo';
import UpdateAccountInfo from '@screens/main/bottom-tab/other/account/UpdateAccountInfo';
import React from 'react';

const OtherStack = createNativeStackNavigator<any>();

const OtherNavigation = () => {
  return (
    <OtherStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={OtherRoutes.OTHER_CHANGE_PASSWORD}
    >
      <OtherStack.Screen
        name={OtherRoutes.OTHER_CHANGE_PASSWORD}
        component={ChangePassword}
      />
      <OtherStack.Screen
        name={OtherRoutes.OTHER_ACCOUNT_INFO}
        component={AccountInfo}
      />
      <OtherStack.Screen
        name={OtherRoutes.OTHER_UPDATE_ACCOUNT_INFO}
        component={UpdateAccountInfo}
      />
    </OtherStack.Navigator>
  );
};

export default OtherNavigation;
