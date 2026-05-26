import { IMeta } from './other.type';

export interface GetAllChatThreadsReq {
  page?: number;
  limit?: number;
}

export type MessageType = 'TEXT' | 'VOICE';

export type ChatRole = 'USER' | 'ASSISTANT';

export interface ChatThread {
  id: number;
  employeeId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  lastMessage: {
    id: number;
    threadId: number;
    role: ChatRole;
    messageType: MessageType;
    content: string;
    voiceUrl: null | string;
    voiceDuration: any;
    createdAt: string;
    deletedAt: null | string;
  };
  messageCount: number;
}

export interface ChatThreadRes {
  data: ChatThread[];
  meta: IMeta;
}

export interface GetChatThreadDetailReq {
  id: number;
  page?: number;
  limit?: number;
}

export interface ChatThreadDetailMessage {
  id: number;
  threadId: number;
  role: ChatRole;
  messageType: MessageType;
  content: string;
  voiceUrl: null | string;
  voiceDuration: any;
  createdAt: string;
  deletedAt: string | null;
}

export interface ChatThreadDetailRes {
  id: number;
  employeeId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  messages: {
    data: ChatThreadDetailMessage[];
    meta: IMeta;
  };
}

export interface SendMessageReq {
  threadId: number;
  body: {
    content: string;
    messageType?: MessageType;
    voiceUrl?: any;
    voiceDuration?: any;
  };
}

export interface SendMessageRes {
  userMessage: {
    id: number;
    threadId: number;
    role: ChatRole;
    messageType: MessageType;
    content: string;
    voiceUrl: any;
    voiceDuration: any;
    createdAt: string;
    deletedAt: null | string;
  };
  assistantMessage: {
    id: number;
    threadId: number;
    role: ChatRole;
    messageType: MessageType;
    content: string;
    voiceUrl: any;
    voiceDuration: any;
    createdAt: string;
    deletedAt: null | string;
  };
}

export interface CreateChatThreadReq {
  title: string;
}

export interface CreateChatThreadRes {
  id: number;
  employeeId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}

export interface DeleteChatThreadRes {
  success: boolean;
  message: string;
}
