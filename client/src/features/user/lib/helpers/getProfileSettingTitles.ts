import type { ProfileSettingSelectNameEnum } from '@entities/user';
import { PROFILE_SETTING_TITLES } from '../constants';

export function getProfileSettingTitles(
  settingName: ProfileSettingSelectNameEnum
): string {
  return PROFILE_SETTING_TITLES[settingName];
}
