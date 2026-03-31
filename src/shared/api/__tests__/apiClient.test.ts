import { ApiClient, apiClientInstance, ApiError } from '../apiClient';

describe('ApiClient', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('normalizes baseUrl with trailing slash', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => ({ ok: true }),
    });
    global.fetch = fetchMock;

    const client = new ApiClient({ baseUrl: 'https://api.example' });
    await client.get('/v1/x');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example/v1/x',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('merges default headers', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      headers: { get: () => 'text/plain' },
      text: async () => 'plain',
    });
    global.fetch = fetchMock;

    const client = new ApiClient({
      baseUrl: 'https://x/',
      defaultHeaders: { 'X-Test': '1' },
    });
    await client.get('p');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://x/p',
      expect.objectContaining({
        headers: expect.objectContaining({ 'X-Test': '1' }),
      }),
    );
  });

  it('serializes JSON body for POST and sets Content-Type', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      headers: { get: () => null },
      text: async () => '',
    });
    global.fetch = fetchMock;

    const client = new ApiClient({ baseUrl: 'https://x/' });
    await client.post('items', { a: 1 });

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe('POST');
    expect(init.body).toBe(JSON.stringify({ a: 1 }));
    expect((init.headers as Record<string, string>)['Content-Type']).toBe('application/json');
  });

  it('throws ApiError when response is not ok', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });
    global.fetch = fetchMock;

    const client = new ApiClient({ baseUrl: 'https://x/' });
    await expect(client.get('missing')).rejects.toMatchObject({
      name: 'ApiError',
      status: 404,
    });
  });

  it('parses JSON when Content-Type is application/json', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json; charset=utf-8' },
      json: async () => ({ id: 2 }),
    });
    global.fetch = fetchMock;

    const client = new ApiClient({ baseUrl: 'https://x/' });
    await expect(client.get<{ id: number }>('r')).resolves.toEqual({ id: 2 });
  });

  it('returns text for non-JSON responses', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      headers: { get: () => 'text/plain' },
      text: async () => 'hello',
    });
    global.fetch = fetchMock;

    const client = new ApiClient({ baseUrl: 'https://x/' });
    await expect(client.get<string>('r')).resolves.toBe('hello');
  });

  it('exposes apiClientInstance', () => {
    expect(apiClientInstance).toBeInstanceOf(ApiClient);
  });
});

describe('ApiError', () => {
  it('sets name and status', () => {
    const err = new ApiError('msg', 500);
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe('ApiError');
    expect(err.status).toBe(500);
    expect(err.message).toBe('msg');
  });
});
