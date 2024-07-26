import type { FC } from 'react';
import { useRef } from 'react';
import { getChatsThunk, selectChatList } from '@entities/chat';
import {
  useAppDispatch,
  useAppSelector,
  useDebouncedCallback,
} from '@shared/lib/hooks';
import { InfinityScroll } from '@shared/ui';
import { ChatListLazy } from './ChatList.lazy';
import styles from './ChatList.module.scss';
import { ChatItem, FailedChats } from './ui';

interface ChatListProps {
  currentUserId: string;
}

export const ChatList: FC<ChatListProps> = ({ currentUserId }) => {
  const dispatch = useAppDispatch();

  const isEnded = useAppSelector((state) => state.chat.isEnded);
  const { chats, currentChatId, isLoading } = useAppSelector(selectChatList);
  const chatsLength = chats.length;

  const chatListRef = useRef<null | HTMLDivElement>(null);

  const delayedGetChats = useDebouncedCallback(() => {
    dispatch(getChatsThunk());
  }, 300);

  if (!chatsLength && isEnded) {
    return <FailedChats />;
  }

  return (
    <div className={styles.chats} ref={chatListRef}>
      <InfinityScroll
        handleLoadMore={delayedGetChats}
        isLoading={isLoading}
        isMore={!isEnded}
        listRef={chatListRef}
      >
        {chats.map((chat) => {
          const isActive = currentChatId === chat.id;
          return (
            <ChatItem
              currentUserId={currentUserId}
              key={chat.id}
              chat={chat}
              isActive={isActive}
            />
          );
        })}
      </InfinityScroll>
      {!isEnded && <ChatListLazy />}
    </div>
  );
};
