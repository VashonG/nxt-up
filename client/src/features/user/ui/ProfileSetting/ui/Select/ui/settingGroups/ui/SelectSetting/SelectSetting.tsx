import classNames from 'classnames';
import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import { useSelectFormControl } from '@features/user';
import type {
  MultiSelectForm,
  ProfileSettingSelectNameEnum,
} from '@entities/user';
import { ListItem } from '@shared/ui';
import styles from './SelectSetting.module.scss';

interface SelectSettingProps {
  control: Control<MultiSelectForm>;
  settingFieldName: ProfileSettingSelectNameEnum;
}

export const SelectSetting: FC<SelectSettingProps> = ({
  control,
  settingFieldName,
}) => {
  const {
    title,
    list,
    items,
    toggleItem,
    validation,
    isValid,
    getIsActive,
    activeLength,
  } = useSelectFormControl(control, settingFieldName);

  return (
    <>
      <div className={styles.subhead}>
        <div className={styles.title}>{title}</div>
        <div className={styles.limit}>
          ({activeLength}/{validation.maxLength})
        </div>
      </div>
      <div className={styles.items}>
        {list.map((selectItem) => {
          const isActive = getIsActive(items, selectItem);
          const cn = classNames(
            styles.item,
            isActive && styles.active,
            !isValid && styles.disabled
          );

          return (
            <ListItem
              onClick={() => toggleItem(selectItem)}
              isActive={isActive}
              pointer
              key={selectItem}
              extraClassName={cn}
            >
              {selectItem}
            </ListItem>
          );
        })}
      </div>
    </>
  );
};
