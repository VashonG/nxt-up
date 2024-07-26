import { AnimatePresence } from 'framer-motion';
import type { FC, ReactElement } from 'react';
import { useNavBlock, NavBlockEnum } from './lib';
import styles from './Nav.module.scss';
import { NavBlock, UserLinks, NavMobile } from './ui';

interface NavProps {
  isMobile?: boolean;
}

export const Nav: FC<NavProps> = ({ isMobile }): ReactElement => {
  const navBlock = useNavBlock();

  if (isMobile) {
    return <NavMobile />;
  }

  return (
    <aside className={styles.nav}>
      <UserLinks isProfilePage={navBlock === NavBlockEnum.Setting} />
      <AnimatePresence initial={false} mode="wait">
        <NavBlock navBlock={navBlock} />
      </AnimatePresence>
    </aside>
  );
};
