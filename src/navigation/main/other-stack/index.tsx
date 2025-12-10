import { OtherRoutes } from '@navigation/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePassword from '@screens/auth/change-password';
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
    </OtherStack.Navigator>
  );
};

export default OtherNavigation;
