import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthRoutes } from '@navigation/routes';
import Login from '@screens/auth/login';

const AuthStack = createNativeStackNavigator<any>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={AuthRoutes.LOGIN}
    >
      <AuthStack.Screen name={AuthRoutes.LOGIN} component={Login} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
