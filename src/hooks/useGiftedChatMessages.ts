// import { useGetChatThreadDetailQuery } from '@services/chat';
// import { useMemo } from 'react';
// import { IMessage } from 'react-native-gifted-chat';

// const USER_ID = 1;
// const ASSISTANT_ID = 2;

// export const useGiftedChatMessages = (chatThreadId?: number) => {
//   const { data, isFetching, refetch } = useGetChatThreadDetailQuery(
//     { id: chatThreadId as number },
//     { skip: !chatThreadId },
//   );

//   const messagesData = useMemo<IMessage[]>(() => {
//     const rawMessages = data?.messages.data ?? [];

//     return [...rawMessages]
//       .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//       .map(item => ({
//         _id: item.id,
//         text: item.content ?? '',
//         createdAt: new Date(item.createdAt),
//         user: {
//           _id: item.role === 'USER' ? USER_ID : ASSISTANT_ID,
//           name: item.role === 'USER' ? 'Bạn' : 'Assistant',
//         },
//       }));
//   }, [data]);

//   return {
//     messagesData,
//     isFetching,
//     refetch,
//   };
// };

import { useGetChatThreadDetailQuery } from '@services/chat';
import { useMemo } from 'react';
import { IMessage } from 'react-native-gifted-chat';

const USER_ID = 1;
const ASSISTANT_ID = 2;

export const useGiftedChatMessages = (chatThreadId?: number) => {
  const { data, isFetching, refetch } = useGetChatThreadDetailQuery(
    { id: chatThreadId as number },
    {
      refetchOnMountOrArgChange: true,
      skip: !chatThreadId,
    },
  );

  const messagesData = useMemo<IMessage[]>(() => {
    if (!data) return [];

    const rawMessages = data.messages?.data ?? [];

    const titleMessage: IMessage = {
      _id: `thread-${data.id}`,
      text: data.title ?? '',
      createdAt: new Date(data.createdAt),
      user: {
        _id: USER_ID,
        name: 'Bạn',
      },
    };

    return [
      titleMessage,
      ...rawMessages.map(item => ({
        _id: item.id,
        text: item.content ?? '',
        createdAt: new Date(item.createdAt),
        user: {
          _id: item.role === 'USER' ? USER_ID : ASSISTANT_ID,
          name: item.role === 'USER' ? 'Bạn' : 'Assistant',
        },
      })),
    ].sort((a, b) => (b.createdAt as Date).getTime() - (a.createdAt as Date).getTime());
  }, [data]);

  return {
    messagesData,
    isFetching,
    refetch,
  };
};
