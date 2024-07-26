import type { FC } from 'react';
import { ChatControl } from '@features/chat';
import { Preview } from '@entities/user';
import { useAppSelector } from '@shared/lib/hooks';
import { Popup } from '@shared/ui';
import { ChatProfilePopupLazy } from './ChatProfilePopup.lazy';
import styles from './ChatProfilePopup.module.scss';

interface ChatProfilePopupProps {
  handleClose: () => void;
}

export const ChatProfilePopup: FC<ChatProfilePopupProps> = ({
  handleClose,
}) => {
  const chatMember = useAppSelector((state) => state.chat.chatMember);

  return (
    <Popup closeHandler={handleClose} size="l" extraClassName={styles.popup}>
      {chatMember ? (
        <Preview
          user={chatMember}
          isFull
          extraContent={<ChatControl submitDelete={handleClose} />}
        />
      ) : (
        <ChatProfilePopupLazy />
      )}
    </Popup>
  );
};
