import { NotFoundSetting } from '@entities/user';
import { useProfileSettingUrl } from '@entities/user';
import { ROUTES } from '@shared/lib/constants';
import { SelectForm } from './ui';

export const ProfileSetting = () => {
  const profileSetting = useProfileSettingUrl();
  if (!profileSetting) {
    return <NotFoundSetting url={`${ROUTES.PROFILE}/edit`} />;
  }

  if (profileSetting.settingType === 'radio') {
    return <div>radio</div>;
  }

  return <SelectForm />;
};
