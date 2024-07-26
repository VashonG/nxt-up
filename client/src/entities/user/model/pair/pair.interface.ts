import type { Range, ShortUser } from '@shared/api/interfaces';
import type { PairsInfo } from '@shared/api/services';

export interface PairFilterForm {
  distance?: number;
  age: Range;
  pictures?: number;
  interests: string[];
  hasInterests: boolean;
  identifyConfirmed: boolean;
}

export interface PairInitialState {
  pairs: ShortUser[];
  isPairsLoading: boolean;
  isPairsEnded: boolean;
  isPairsInfoLoading: boolean;
  pairsInfo: PairsInfo | null;
}

export interface GetUserPairsProps {
  isInitial: boolean;
  filter?: PairFilterForm;
}

export interface GetUserPairsThunkReturn {
  pairs: ShortUser[];
  isInitial: boolean;
}
