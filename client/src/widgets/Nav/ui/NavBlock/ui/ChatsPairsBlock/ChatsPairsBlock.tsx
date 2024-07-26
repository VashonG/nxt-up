import { AnimatePresence, motion } from 'framer-motion';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getIsChatPage } from '@entities/chat';
import { ChatList } from '@entities/chat';
import { PairLink } from '@entities/user';
import { useAppSelector } from '@shared/lib/hooks';
import styles from './ChatsPairsBlock.module.scss';
import { chatListVariants, pairLinkVariants } from './ChatsPairsBlock.variants';
import { Tabs } from './ui';

export const ChatsPairsBlock: FC = () => {
  const { pathname } = useLocation();

  const currentUserId = useAppSelector((state) => state.user.currentUser!.id);

  const [isPairsOpened, setIsPairsOpened] = useState<boolean>(true);

  useEffect(() => {
    setIsPairsOpened(!getIsChatPage(pathname));
  }, [pathname]);

  return (
    <>
      <Tabs isPairsOpened={isPairsOpened} setIsPairsOpened={setIsPairsOpened} />
      <div className={styles.content}>
        <AnimatePresence initial={false} mode="wait">
          {isPairsOpened ? (
            <motion.div
              key="pair-link"
              variants={pairLinkVariants}
              initial={'slideOut'}
              animate={'slideIn'}
              exit={'slideOut'}
              transition={{ duration: 0.25 }}
              className={styles.block}
            >
              <PairLink />
            </motion.div>
          ) : (
            <motion.div
              key="chat-list"
              variants={chatListVariants}
              initial={'slideOut'}
              animate={'slideIn'}
              exit={'slideExit'}
              transition={{ duration: 0.25 }}
              className={styles.block}
            >
              <ChatList currentUserId={currentUserId} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
