import { apiClientInstance } from '@api';

import { FullNameRequest, FullNameResponse } from '../types';

export class FullNameApiService {
  async saveFullName(data: FullNameRequest): Promise<FullNameResponse> {
    try {
      return await apiClientInstance.post<FullNameResponse>('full-name', data);
    } catch {
      // Mock implementation when server is not available
      console.warn('Mocking API response for saveFullName');
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            id: Math.random().toString(36).substring(2, 9),
            lastName: data.lastName,
            firstName: data.firstName,
            middleName: data.middleName,
          });
        }, 500);
      });
    }
  }
}

export const fullNameApiService = new FullNameApiService();
