import type { ComponentType, FC } from 'react';
import { useEffect } from 'react';
import { useAppDispatch } from '@hooks';
import {
  blockChat,
  deleteChat,
  deleteMessage,
  editMessage,
  pushNewMessage,
  setConnectedSocket,
  setIsNotFound,
  unblockChat,
} from '@entities/chat';
import { checkAuthThunk } from '@entities/user';
import type {
  ReceivedChatBlock,
  ReceivedMessage,
  ReceivedNewMessage,
} from '@shared/api/interfaces';
import { ChatSocketEvent, chatService } from '@shared/api/services';
import type { WsExceptionError } from '@shared/lib/interfaces';

export function WithChatConnection<P extends object>(
  Component: ComponentType<P>
): FC<P> {
  const Wrapper = (props: P) => {
    useChatConnection();

    return <Component {...props} />;
  };

  return Wrapper;
}

export function useChatConnection() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { on, onAny } = chatService.connect();

    dispatch(setConnectedSocket());

    onAny((event: string, ...errors: unknown[]) => {
      if (event === 'exception' && (errors[0] as WsExceptionError).message) {
        switch ((errors[0] as WsExceptionError).message) {
          case 'Unauthorized':
            dispatch(checkAuthThunk());
            break;
          case 'Validation failed (uuid v 4 is expected)':
          case 'Not Found':
            dispatch(setIsNotFound(true));
            break;
          default:
            break;
        }
      }
    });

    on(ChatSocketEvent.SendMessage, (data: ReceivedNewMessage) => {
      dispatch(pushNewMessage(data));
    });

    on(ChatSocketEvent.EditMessage, (data: ReceivedMessage) => {
      dispatch(editMessage(data));
    });

    on(ChatSocketEvent.DeleteMessage, (data: ReceivedMessage) => {
      dispatch(deleteMessage(data));
    });

    on(ChatSocketEvent.BlockChat, (data: ReceivedChatBlock) => {
      dispatch(blockChat(data));
    });

    on(ChatSocketEvent.UnblockChat, (data: ReceivedChatBlock) => {
      dispatch(unblockChat(data));
    });

    on(ChatSocketEvent.DeleteChat, (deletedChatId: string) => {
      dispatch(deleteChat(deletedChatId));
    });

    return () => {
      chatService.disconnect();
    };
  }, [dispatch]);
}
