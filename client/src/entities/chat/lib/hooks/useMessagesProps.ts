import type { Message } from '@shared/api/interfaces';
import { getTime } from '@shared/helpers';
import { useAppSelector } from '@shared/lib/hooks';

export function useMessagesProps(selectedMessage: Message | null) {
  const currentUserId = useAppSelector((state) => state.user.currentUser!.id);

  const getSelectProps = (message: Message) => {
    return {
      isSelectOpen: getIsSelectOpen(message, selectedMessage),
    };
  };

  const getTextProps = (message: Message) => ({
    time: getMessageTime(message),
    text: message.text,
    isEdited: getIsEdited(message),
  });

  const getUsernameProps = (message: Message) => {
    const isOwn = getIsOwn(message.userId, currentUserId);
    const username = message.name;

    return {
      isOwn,
      username,
    };
  };

  const getReplyProps = (message: Message) => {
    const repliedMessage = message.replied;
    const repliedMessageText = repliedMessage?.text;
    const repliedMessageName = repliedMessage?.name;

    return {
      repliedUsername: repliedMessageName,
      repliedMessageText,
    };
  };

  const getBodyProps = (message: Message) => {
    const isOwn = getIsOwn(message.userId, currentUserId);
    const isEdited = getIsEdited(message);
    const isSelectOpen = getIsSelectOpen(message, selectedMessage);

    return {
      isOwn,
      isEdited,
      isSelectOpen,
    };
  };

  return {
    getBodyProps,
    getUsernameProps,
    getReplyProps,
    getTextProps,
    getSelectProps,
  };
}

function getIsOwn(
  messageUserId: string | undefined,
  currentUserId: string
): boolean {
  return messageUserId === currentUserId;
}

function getIsEdited(message: Message) {
  return message.createdAt !== message.updatedAt;
}

function getIsSelectOpen(message: Message, currentMessage: Message | null) {
  return message.id === currentMessage?.id;
}

function getMessageTime(message: Message) {
  return getIsEdited(message)
    ? `edited ${getTime(
        new Date(message.updatedAt).toLocaleTimeString()
      )!.toString()}`
    : getTime(new Date(message.createdAt).toLocaleTimeString())!.toString();
}
