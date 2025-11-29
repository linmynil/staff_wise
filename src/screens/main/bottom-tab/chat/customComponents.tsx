import colors from '@utils/constants/colors';
import React from 'react';
import { Text, View } from 'react-native';
import {
  Avatar,
  AvatarProps,
  Bubble,
  BubbleProps,
  IMessage,
  Message,
  MessageProps,
  MessageText,
  MessageTextProps,
  SystemMessage,
  SystemMessageProps,
  User,
} from 'react-native-gifted-chat';

export const renderAvatar = (props: AvatarProps<IMessage>) => (
  <Avatar
    {...props}
    imageStyle={{
      left: {
        marginRight: -8,
      },
    }}
  />
);

export const renderBubble = (props: BubbleProps<IMessage>) => (
  <Bubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor: colors.primary.default,
      },
      left: {
        backgroundColor: colors.primary.c100,
      },
    }}
  />
);

export const renderSystemMessage = (props: SystemMessageProps<IMessage>) => (
  <SystemMessage
    {...props}
    containerStyle={{ backgroundColor: colors.transparent }}
    textStyle={{ color: 'crimson', fontWeight: '900' }}
  />
);

export const renderMessage = (props: MessageProps<IMessage>) => (
  <Message
    {...props}
    containerStyle={{
      left: {
        backgroundColor: colors.transparent,
      },
      right: { backgroundColor: colors.transparent },
    }}
  />
);

export const renderMessageText = (props: MessageTextProps<IMessage>) => (
  <MessageText
    {...props}
    containerStyle={{
      left: { backgroundColor: colors.transparent },
      right: { backgroundColor: colors.transparent },
    }}
    textStyle={{
      left: { color: colors.black },
      right: { color: colors.black },
    }}
    customTextStyle={{ fontSize: 16, lineHeight: 20 }}
  />
);

interface CustomViewProps {
  user: User;
}

export const renderCustomView: React.FC<CustomViewProps> = ({ user }) => (
  <View style={{ minHeight: 20, alignItems: 'center' }}>
    <Text>
      Current user:
      {user.name}
    </Text>
    <Text>From CustomView</Text>
  </View>
);
