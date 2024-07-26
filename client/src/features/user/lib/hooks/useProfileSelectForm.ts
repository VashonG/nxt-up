import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { MultiSelectForm } from '@entities/user';
import { useDefaultProfileValues, useProfileSettingUrl } from '@entities/user';
import { updateUserThunk } from '@entities/user';
import { ROUTES } from '@shared/lib/constants';
import { useAppDispatch } from '@shared/lib/hooks';
import { parseSelectData } from '../helpers';

export function useProfileSelectForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const profileSetting = useProfileSettingUrl()!;

  const { handleSubmit, control } = useForm<MultiSelectForm>({
    defaultValues: useDefaultProfileValues(profileSetting.settingName),
    mode: 'onChange',
  });

  const submitHandler = handleSubmit((data: MultiSelectForm) => {
    const parsedData = parseSelectData(data);

    dispatch(updateUserThunk(parsedData));
    navigate(`${ROUTES.PROFILE}/edit`);
  });

  return {
    control,
    settingName: profileSetting.settingName,
    submitHandler,
  };
}
