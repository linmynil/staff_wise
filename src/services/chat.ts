import {
  ChatThreadDetailRes,
  ChatThreadRes,
  CreateChatThreadReq,
  CreateChatThreadRes,
  DeleteChatThreadRes,
  GetAllChatThreadsReq,
  GetChatThreadDetailReq,
  SendMessageReq,
  SendMessageRes,
} from '@utils/types/chat.type';
import { baseAPI, Method, tagTypes } from './baseAPI';

export const chatServive = baseAPI.injectEndpoints({
  endpoints: buider => ({
    getAllChatThreads: buider.query<ChatThreadRes, GetAllChatThreadsReq>({
      query: data => ({
        endpoint: `/chat/threads`,
        method: Method.GET,
        params: data,
      }),
      providesTags: [tagTypes.Chat],
    }),
    getChatThreadDetail: buider.query<ChatThreadDetailRes, GetChatThreadDetailReq>({
      query: data => ({
        endpoint: `/chat/threads/${data.id}`,
        method: Method.GET,
      }),
      providesTags: [tagTypes.Chat],
    }),
    sendMessage: buider.mutation<SendMessageRes, SendMessageReq>({
      query: data => ({
        endpoint: `/chat/threads/${data.threadId}/messages`,
        method: Method.POST,
        data: data.body,
      }),
    }),
    createChatThread: buider.mutation<CreateChatThreadRes, CreateChatThreadReq>({
      query: data => ({
        endpoint: `/chat/threads`,
        method: Method.POST,
        data,
      }),
    }),
    deleteChatThread: buider.mutation<DeleteChatThreadRes, number>({
      query: id => ({
        endpoint: `/chat/threads/${id}`,
        method: Method.DELETE,
      }),
    }),
  }),
});

export const {
  useGetAllChatThreadsQuery,
  useGetChatThreadDetailQuery,
  useSendMessageMutation,
  useCreateChatThreadMutation,
  useDeleteChatThreadMutation,
} = chatServive;
