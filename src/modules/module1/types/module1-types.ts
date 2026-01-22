import { LoadingState } from '@constants';

export type Module1StoreType = {
  loading: LoadingState;
  items: unknown[];
  step: string;
};
