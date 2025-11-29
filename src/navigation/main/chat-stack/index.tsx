import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ChatRoutes } from '@navigation/routes';
import Chat from '@screens/main/bottom-tab/chat/Chat';

const ChatStack = createNativeStackNavigator<any>();

const ChatNavigation = () => {
  return (
    <ChatStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ChatRoutes.CHAT_SCREEN}
    >
      <ChatStack.Screen name={ChatRoutes.CHAT_SCREEN} component={Chat} />
    </ChatStack.Navigator>
  );
};

export default ChatNavigation;
