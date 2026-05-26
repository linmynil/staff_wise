/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddIcon, AudioStopIcon } from '@assets';
import { Button, Text, View } from '@components';
import MainLayout from '@components/layout/main-layout';
import colors from '@utils/constants/colors';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { renderAvatar, renderBubble, renderMessage, renderMessageText } from './customComponents';
import { RenderInputToolbar, renderSend } from './InputToolbar';
import {
  startListening,
  stopListening,
  addEventListener,
} from '@ascendtis/react-native-voice-to-text';
import { requestMicrophonePermission } from '@utils/helpers/permisson.helper';
import { useFocusEffect } from '@react-navigation/native';
import {
  useCreateChatThreadMutation,
  useGetChatThreadDetailQuery,
  useSendMessageMutation,
} from '@services/chat';
import { useGiftedChatMessages } from '@hooks/useGiftedChatMessages';
import { useAppDispatch } from '@redux/store';
import { baseAPI, tagTypes } from '@services/baseAPI';

const Chat = ({ navigation, route }: any) => {
  const { chatThreadId } = route.params || {};
  const dispatch = useAppDispatch();

  const [chatThreadIdState, setChatThreadIdState] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (chatThreadId) {
      setChatThreadIdState(chatThreadId);
    }
  }, [chatThreadId]);

  const { messagesData } = useGiftedChatMessages(chatThreadIdState);
  const [sendMessage, { isLoading: isLoadingSendingMessage }] = useSendMessageMutation();
  const [createNewChatThread] = useCreateChatThreadMutation();

  const [text, setText] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isVisibleRecordAudio, setIsVisibleRecordAudio] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();

  const tabbarHeight = 50;
  const keyboardVerticalOffset = insets.bottom + tabbarHeight;

  useEffect(() => {
    if (messagesData?.length > 0) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        Keyboard.dismiss();
      };
    }, []),
  );

  useEffect(() => {
    requestMicrophonePermission();

    const startEventListener = addEventListener('onSpeechStart', () => {
      console.log('speech started');
      setIsListening(true);
    });

    const endEventListener = addEventListener('onSpeechEnd', () => {
      console.log('onSpeechEnd');
      setIsListening(false);
    });

    const resultsEventListener = addEventListener('onSpeechResults', e => {
      console.log('onSpeechResults', e);
      setText(e.value);
    });

    const errorEventListener = addEventListener('onSpeechError', e => {
      console.log('onSpeechError', e);
      setIsListening(false);
    });

    const resultsPartialEventListener = addEventListener('onSpeechPartialResults', e => {
      console.log('onSpeechPartialResults', e);
      setText(e.value);
    });

    return () => {
      startEventListener.remove();
      endEventListener.remove();
      resultsEventListener.remove();
      errorEventListener.remove();
    };
  }, []);

  const _handlePressButton = async () => {
    try {
      if (isListening) {
        setIsListening(false);
        stopListening();
      } else {
        setText('');
        await startListening();
        setIsListening(true);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const onSend = async (newMessages: IMessage[] = []) => {
    if (!chatThreadIdState) {
      try {
        const res = await createNewChatThread({ title: newMessages[0].text }).unwrap();

        if (res?.id) {
          setChatThreadIdState(res.id);
          dispatch(baseAPI.util.invalidateTags([tagTypes.Chat]));
        }
        return;
      } catch (error) {
        console.log('error', error);
      }
    }
    setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
    const content = newMessages[0].text;
    try {
      const res = await sendMessage({
        threadId: chatThreadIdState as unknown as number,
        body: {
          content,
          messageType: 'TEXT',
        },
      }).unwrap();
      if (res) {
        dispatch(baseAPI.util.invalidateTags([tagTypes.Chat]));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const showRecordAudio = () => {
    Keyboard.dismiss();
    setIsVisibleRecordAudio(!isVisibleRecordAudio);
  };

  return (
    <MainLayout back={<MainLayout.BackToPreviousButton />}>
      <GiftedChat
        isTyping={isLoadingSendingMessage}
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
        renderSend={props =>
          renderSend(props, {
            isListening,
            onToggleRecord: showRecordAudio,
          })
        }
        renderAvatar={renderAvatar}
        renderMessage={renderMessage}
        renderMessageText={renderMessageText}
        renderBubble={renderBubble}
        messagesContainerStyle={{
          backgroundColor: isDark ? '#1a1a1a' : colors.background,
        }}
        textInputProps={{
          value: text,
          onChangeText: setText,
          placeholderTextColor: colors.neutral.c500,
          placeholder: isListening ? 'Recording...' : 'Write your message',
          submitBehavior: 'newline',
        }}
        keyboardAvoidingViewProps={{ keyboardVerticalOffset }}
        listProps={{
          keyboardShouldPersistTaps: 'always',
        }}
      />

      {isVisibleRecordAudio && (
        <View style={styles.recordAudio}>
          <Text weight={600} size={16}>
            Click to record your voice
          </Text>
          {isListening ? (
            <Pressable style={styles.buttonAudioRecord} onPress={_handlePressButton}>
              <AudioStopIcon width={48} height={48} />
            </Pressable>
          ) : (
            <Pressable style={styles.buttonAudioRecord} onPress={_handlePressButton}>
              <Image
                source={require('@assets/images/microphone.png')}
                style={{
                  width: 48,
                  height: 48,
                }}
              />
            </Pressable>
          )}
        </View>
      )}
    </MainLayout>
  );
};

export default Chat;

const styles = StyleSheet.create({
  recordAudio: {
    paddingHorizontal: 16,
    paddingVertical: 30,
    alignItems: 'center',
    marginTop: -24,
    backgroundColor: colors.white,
    gap: 16,
  },
  buttonAudioRecord: {
    width: 75,
    height: 75,
    backgroundColor: colors.primary.default,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
