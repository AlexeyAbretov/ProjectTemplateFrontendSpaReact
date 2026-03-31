import { apiClientInstance } from '@api';

import { fullNameApiService } from '../FullNameModule.api';

describe('FullNameApiService', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('returns API response when post succeeds', async () => {
    jest.spyOn(apiClientInstance, 'post').mockResolvedValue({
      id: 'api-id',
      lastName: 'L',
      firstName: 'F',
      middleName: undefined,
    });

    const p = fullNameApiService.saveFullName({
      lastName: 'L',
      firstName: 'F',
    });

    await expect(p).resolves.toMatchObject({ id: 'api-id' });
  });

  it('falls back to mock when post throws', async () => {
    jest.spyOn(apiClientInstance, 'post').mockRejectedValue(new Error('down'));

    const p = fullNameApiService.saveFullName({
      lastName: 'A',
      firstName: 'B',
      middleName: 'C',
    });

    jest.runAllTimersAsync();

    const result = await p;
    expect(result.lastName).toBe('A');
    expect(result.firstName).toBe('B');
    expect(result.middleName).toBe('C');
    expect(result.id).toBeDefined();
  });
});
