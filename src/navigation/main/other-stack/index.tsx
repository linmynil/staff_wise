import { OtherRoutes } from '@navigation/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePassword from '@screens/auth/change-password';
import ProfileInfo from '@screens/main/bottom-tab/other/profile';
import UpdateProfileInfo from '@screens/main/bottom-tab/other/profile/UpdateProfileInfo';
import React from 'react';

const OtherStack = createNativeStackNavigator<any>();

const OtherNavigation = () => {
  return (
    <OtherStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={OtherRoutes.OTHER_CHANGE_PASSWORD}
    >
      <OtherStack.Screen name={OtherRoutes.OTHER_CHANGE_PASSWORD} component={ChangePassword} />
      <OtherStack.Screen name={OtherRoutes.OTHER_ACCOUNT_INFO} component={ProfileInfo} />
      <OtherStack.Screen
        name={OtherRoutes.OTHER_UPDATE_ACCOUNT_INFO}
        component={UpdateProfileInfo}
      />
    </OtherStack.Navigator>
  );
};

export default OtherNavigation;
