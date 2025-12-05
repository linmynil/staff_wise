import { AddIcon } from '@assets';
import { Button } from '@components';
import MainLayout from '@components/layout/main-layout';
import colors from '@utils/constants/colors';
import React, {useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  renderAvatar,
  renderBubble,
  renderMessage,
  renderMessageText,
} from './customComponents';
import { RenderInputToolbar, renderSend } from './InputToolbar';
import initialMessages from './messages';

const Chat = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();

  const tabbarHeight = 50;
  const keyboardVerticalOffset = insets.bottom + tabbarHeight;

  useEffect(() => {
    setMessages(initialMessages.reverse());
  }, []);

  const onSend = (newMessages: IMessage[] = []) => {
    setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
  };

  return (
    <MainLayout
      back={<MainLayout.BackToPreviousButton />}
      next={
        <Button.IconButton
          icon={<AddIcon width={25} height={25} viewBox="0 0 30 30" />}
        />
      }
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <GiftedChat
          messages={messages}
          text={text}
          onSend={onSend}
          user={{
            _id: 1,
            name: 'Aaron',
            avatar:
              'https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid&w=740&q=80',
          }}
          isAlignedTop
          isSendButtonAlwaysVisible
          isAvatarOnTop={false}
          onPressAvatar={console.log}
          renderInputToolbar={RenderInputToolbar}
          renderSend={renderSend}
          renderAvatar={renderAvatar}
          renderMessage={renderMessage}
          renderMessageText={renderMessageText}
          renderBubble={renderBubble}
          messagesContainerStyle={{
            backgroundColor: isDark ? '#1a1a1a' : colors.background,
          }}
          textInputProps={{
            onChangeText: setText,
            placeholderTextColor: colors.neutral.c500,
            placeholder: 'Write your message',
          }}
          keyboardAvoidingViewProps={{ keyboardVerticalOffset }}


        />
      </SafeAreaView >
    </MainLayout>

  );
};

export default Chat;
