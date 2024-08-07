import { WithErrorFallback } from '@shared/lib/hocs';

import { FilterPairsItems as FilterPairsItemsRaw } from './FilterPairsItems/FilterPairsItems';
import { LoginForm as LoginFormRaw } from './LoginForm/LoginForm';
import { LogoutButton as LogoutButtonRaw } from './LogoutButton/LogoutButton';
import { PairsFilterPopup as PairsFilterPopupRaw } from './PairsFilterPopup/PairsFilterPopup';
import { PairsList as PairsListRaw } from './PairsList/PairsList';
import { PicturesDND as PicturesDNDRaw } from './PicturesDND/PicturesDND';
import { PlacesGeolocation as PlacesGeolocationRaw } from './PlacesGeolocation/PlacesGeolocation';
import { ProfileSetting as ProfileSettingRaw } from './ProfileSetting/ProfileSetting';
import { ProfileSettingsList as ProfileSettingsListRaw } from './ProfileSettingsList/ProfileSettingsList';
import { ProfileSubmit as ProfileSubmitRaw } from './ProfileSubmit/ProfileSubmit';
import { RatePairPopup as RatePairPopupRaw } from './RatePairPopup/RatePairPopup';
import { RegistrationForm as RegistrationFormRaw } from './RegistrationForm/RegistrationForm';
import { SettingsBlock as SettingsBlockRaw } from './SettingsBlock/SettingsBlock';
import { SwipeUser as SwipeUserRaw } from './SwipeUser/SwipeUser';
import { UploadImagePopups as UploadImagePopupsRaw } from './UploadImagePopups/UploadImagePopups';

export const FilterPairsItems = WithErrorFallback(FilterPairsItemsRaw);
export const LoginForm = WithErrorFallback(LoginFormRaw);
export const LogoutButton = WithErrorFallback(LogoutButtonRaw);
export const PairsFilterPopup = WithErrorFallback(PairsFilterPopupRaw);
export const PairsList = WithErrorFallback(PairsListRaw);
export const PicturesDND = WithErrorFallback(PicturesDNDRaw);
export const PlacesGeolocation = WithErrorFallback(PlacesGeolocationRaw);
export const ProfileSetting = WithErrorFallback(ProfileSettingRaw);
export const ProfileSettingsList = WithErrorFallback(ProfileSettingsListRaw);
export const ProfileSubmit = WithErrorFallback(ProfileSubmitRaw);
export const RatePairPopup = WithErrorFallback(RatePairPopupRaw);
export const RegistrationForm = WithErrorFallback(RegistrationFormRaw);
export const SettingsBlock = WithErrorFallback(SettingsBlockRaw);
export const SwipeUser = WithErrorFallback(SwipeUserRaw);
export const UploadImagePopups = WithErrorFallback(UploadImagePopupsRaw);
