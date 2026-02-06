import { LoadingState } from '@constants';

export interface FullNameRequest {
  lastName: string; // Фамилия
  firstName: string; // Имя
  middleName?: string | undefined; // Отчество (optional)
}

export interface FullNameResponse {
  id: string;
  lastName: string;
  firstName: string;
  middleName?: string | undefined;
}

export interface FullNameStoreType {
  loading: LoadingState;
  fullName: {
    id: string;
    lastName: string;
    firstName: string;
    middleName?: string | undefined;
  } | null;
  error: string | null;
}
