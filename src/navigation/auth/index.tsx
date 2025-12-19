import { AuthRoutes } from '@navigation/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePassword from '@screens/auth/change-password';
import Login from '@screens/auth/login';
import React from 'react';

const AuthStack = createNativeStackNavigator<any>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={AuthRoutes.AUTH_LOGIN}
    >
      <AuthStack.Screen name={AuthRoutes.AUTH_LOGIN} component={Login} />
      <AuthStack.Screen name={AuthRoutes.AUTH_CHANGE_PASSWORD} component={ChangePassword} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
