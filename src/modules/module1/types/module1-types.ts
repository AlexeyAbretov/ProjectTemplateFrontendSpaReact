import { LoadingState } from '@constants';

export type Module1ListItem = {
  id: number;
  name: string;
};

export type Module1StoreType = {
  loading: LoadingState;
  items: Module1ListItem[];
  step: string;
};
