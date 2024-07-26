import { LinkSettingThumbnail } from '@entities/user';
import { ROUTES } from '@shared/lib/constants';
import { useAppSelector } from '@shared/lib/hooks';

export const SmokingAttitudeSettingThumbnail = () => {
  const smokingAttitude = useAppSelector(
    (state) => state.user.currentUser!.smokingAttitude
  );

  const url = `${ROUTES.PROFILE}/edit/lifestyle`;
  const value = smokingAttitude ? smokingAttitude : 'Add';

  return (
    <LinkSettingThumbnail
      url={url}
      title="Smoking"
      value={value as string}
      isPointer
    />
  );
};
