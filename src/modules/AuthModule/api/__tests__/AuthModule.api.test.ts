import { apiClientInstance } from '@api';

import { authApiService } from '../AuthModule.api';

describe('AuthApiService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('login delegates to api client', async () => {
    jest.spyOn(apiClientInstance, 'post').mockResolvedValue({
      token: 't',
      user: { id: '1', email: 'a@b.c' },
    });

    const res = await authApiService.login({ email: 'a@b.c' });

    expect(apiClientInstance.post).toHaveBeenCalledWith('auth/login', { email: 'a@b.c' });
    expect(res.token).toBe('t');
  });

  it('logout delegates to api client', async () => {
    jest.spyOn(apiClientInstance, 'post').mockResolvedValue(undefined);

    await authApiService.logout();

    expect(apiClientInstance.post).toHaveBeenCalledWith('auth/logout');
  });
});
