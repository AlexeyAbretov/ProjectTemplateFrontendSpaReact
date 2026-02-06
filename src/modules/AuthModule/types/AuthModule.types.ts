import { LoadingState } from '@constants';

export interface LoginRequest {
  email: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export interface AuthStoreType {
  loading: LoadingState;
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
  } | null;
  token: string | null;
  error: string | null;
}
