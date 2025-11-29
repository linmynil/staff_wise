import useAuthen from '@hooks/useAuthen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { authSlice } from '@redux/reducers/auth.slice';
import { useAppDispatch } from '@redux/selectors';
import events, { eventKeys } from '@utils/helpers/events';
import React, { useEffect } from 'react';
import AuthNavigator from './auth';
import MainNavigation from './main/main-stack';
import { RootRoutes } from './routes';

const RootStack = createNativeStackNavigator<any>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootContent />
    </NavigationContainer>
  );
};

const RootContent = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const isSignedIn = useAuthen();

  useEffect(() => {
    const sub = events.on(eventKeys.resetToken, () => {
      dispatch(authSlice.actions.removeToken());
    });
    return () => {
      events.off(sub);
    };
  }, []);

  useEffect(() => {
    navigation.reset({
      index: 0,
      routes: [
        { name: (isSignedIn ? RootRoutes.MAIN : RootRoutes.AUTH) as never },
      ],
    });
  }, [isSignedIn]);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={RootRoutes.AUTH} component={AuthNavigator} />
      <RootStack.Screen name={RootRoutes.MAIN} component={MainNavigation} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
