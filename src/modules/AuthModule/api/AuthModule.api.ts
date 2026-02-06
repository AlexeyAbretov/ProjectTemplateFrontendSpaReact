import { apiClientInstance } from '@api';

import { LoginRequest, LoginResponse } from '../types';

export class AuthApiService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    return apiClientInstance.post<LoginResponse>('auth/login', data);
  }

  async logout(): Promise<void> {
    return apiClientInstance.post<void>('auth/logout');
  }
}

export const authApiService = new AuthApiService();
