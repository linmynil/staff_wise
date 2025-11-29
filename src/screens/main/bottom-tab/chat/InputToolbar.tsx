/* eslint-disable react/no-unstable-nested-components */
import { View } from '@components';
import colors from '@utils/constants/colors';
import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {
  InputToolbar,
  Actions,
  Composer,
  Send,
  IMessage,
  InputToolbarProps,
  ActionsProps,
  ComposerProps,
  SendProps,
} from 'react-native-gifted-chat';

export const RenderInputToolbar = (props: InputToolbarProps<IMessage>) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <InputToolbar
      {...props}
      containerStyle={[
        styles.shadow,
        {
          backgroundColor: isDark ? '#1a1a1a' : colors.white,
          borderTopWidth: 0,
          marginBottom: 18,
          marginHorizontal: 16,
          borderRadius: 32,
          paddingVertical: 8,
          paddingLeft: 12,
        },
      ]}
      primaryStyle={{ alignItems: 'center' }}
    />
  );
};

export const RenderActions = (props: ActionsProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Actions
      {...props}
      //@ts-ignore
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 0,
      }}
      icon={() => (
        <Image
          style={{ width: 32, height: 32 }}
          source={require('@assets/images/microphone.png')}
        />
      )}
      optionTintColor={isDark ? '#ffffff' : '#222B45'}
      onPressActionButton={() => {
        console.log('ghi âm');
      }}
      buttonStyle={
        {
          // backgroundColor: 'red',
        }
      }
    />
  );
};

export const RenderComposer = (props: ComposerProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Composer
      {...props}
      textInputProps={{
        style: {
          color: isDark ? '#ffffff' : '#222B45',
          backgroundColor: isDark ? '#2a2a2a' : colors.transparent,
          borderRadius: 5,
          paddingTop: 8.5,
          paddingHorizontal: 12,
          marginLeft: 5,
        },
        placeholderTextColor: isDark ? '#888' : colors.neutral.c500,
        placeholder: 'Write your message',
      }}
    />
  );
};

export const renderSend = (props: SendProps<IMessage>) => (
  <View row center>
    <TouchableOpacity
      onPress={() => console.log('xử lý ghi âm')}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        style={{ width: 32, height: 32 }}
        source={require('@assets/images/microphone.png')}
      />
    </TouchableOpacity>

    <Send
      {...props}
      //@ts-ignore
      isDisabled={!props.text}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
      }}
    >
      <Image
        style={{ width: 32, height: 32 }}
        source={require('@assets/images/send.png')}
      />
    </Send>
  </View>
);

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
