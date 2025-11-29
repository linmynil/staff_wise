import MainLayout from '@components/layout/main-layout';
import { DraggableChatbot } from '@components/ui/draggable-chatbot/DraggableChatbot';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';

const ChatHome = () => {
  const navigation = useNavigation<any>();
  return (
    <MainLayout title="Chat">
      <View>
        <DraggableChatbot navigation={navigation} />
        <Text>ApplyLeave</Text>
      </View>
    </MainLayout>
  );
};

export default ChatHome;
