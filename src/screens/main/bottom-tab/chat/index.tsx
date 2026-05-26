import { SadFace } from '@assets';
import { Button, EmptyData, Text, useModal, View } from '@components';
import MainLayout from '@components/layout/main-layout';
import ChatThreadItem from '@components/ui/chat-thread-item';
import { DraggableChatbot } from '@components/ui/draggable-chatbot/DraggableChatbot';
import { ChatRoutes, MainRoutes } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '@redux/store';
import { baseAPI, tagTypes } from '@services/baseAPI';
import { useDeleteChatThreadMutation, useGetAllChatThreadsQuery } from '@services/chat';
import colors from '@utils/constants/colors';
import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

const ChatHome = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { modalControl } = useModal();
  const { data: chatThreads, isFetching: isFetchingChatThreads } = useGetAllChatThreadsQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );
  const chatThreadsData = chatThreads?.data || [];

  const [deleteChatThread, { isLoading: isDeletingChatThread }] = useDeleteChatThreadMutation();

  const handlePressChatThread = (chatThreadId: number) => {
    navigation.navigate(MainRoutes.MAIN_CHAT, {
      screen: ChatRoutes.CHAT_SCREEN,
      params: { chatThreadId },
    });
  };

  const handleDeleteChatThread = (chatThreadId: number) => {
    modalControl?.open({
      title: '',
      content: (
        <View center gap={16}>
          <SadFace color={colors.primary.default} />
          <Text align="center">You want to delete this message?</Text>
        </View>
      ),
      button1: (
        <Button
          loading={isDeletingChatThread}
          disabled={isDeletingChatThread}
          title="Agree"
          onPress={async () => {
            const res = await deleteChatThread(chatThreadId).unwrap();
            if (res?.success) {
              dispatch(baseAPI.util.invalidateTags([tagTypes.Chat]));
              modalControl?.close();
            }
          }}
        />
      ),
      button2: (
        <Button
          disabled={isDeletingChatThread}
          title="Cancel"
          type={Button.Type.outline}
          onPress={() => {
            modalControl?.close();
          }}
        />
      ),
    });
  };

  return (
    <MainLayout title="Chat">
      <View style={styles.container}>
        <DraggableChatbot navigation={navigation} />
        <FlatList
          refreshControl={<RefreshControl refreshing={isFetchingChatThreads} />}
          keyExtractor={item => item?.id?.toString()}
          data={chatThreadsData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 18,
          }}
          renderItem={({ item }) => (
            <ChatThreadItem
              item={item}
              onPress={() => handlePressChatThread(item.id)}
              onLongPress={() => handleDeleteChatThread(item.id)}
            />
          )}
          ListEmptyComponent={isFetchingChatThreads ? <></> : <EmptyData title="Chat is empty" />}
        />
      </View>
    </MainLayout>
  );
};

export default ChatHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 18,
  },
});
