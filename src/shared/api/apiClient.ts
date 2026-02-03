export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiClientConfig {
  baseUrl: string;
  defaultHeaders?: HeadersInit;
}

export interface RequestOptions extends Omit<RequestInit, 'method' | 'body'> {
  body?: unknown;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly response?: Response,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ApiClient {
  private readonly baseUrl: string;
  private readonly defaultHeaders: HeadersInit;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/?$/, '/');
    this.defaultHeaders = config.defaultHeaders ?? {};
  }

  private getUrl(path: string): string {
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    return `${this.baseUrl}${normalizedPath}`;
  }

  private async request<T>(
    method: RequestMethod,
    path: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const url = this.getUrl(path);
    const { body, headers: optionsHeaders, ...rest } = options;

    const headers: HeadersInit = {
      ...this.defaultHeaders,
      ...optionsHeaders,
    };

    const init: RequestInit = {
      ...rest,
      method,
      headers,
    };

    if (body !== undefined && body !== null && method !== 'GET') {
      init.body = typeof body === 'string' ? body : JSON.stringify(body);
      if (typeof (headers as Record<string, string>)['Content-Type'] === 'undefined') {
        (headers as Record<string, string>)['Content-Type'] = 'application/json';
      }
    }

    const response = await fetch(url, init);

    if (!response.ok) {
      throw new ApiError(
        response.statusText || `HTTP ${response.status}`,
        response.status,
        response,
      );
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      return (await response.json()) as T;
    }

    return (await response.text()) as unknown as T;
  }

  get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('GET', path, options);
  }

  post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('POST', path, { ...options, body });
  }

  put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('PUT', path, { ...options, body });
  }

  patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('PATCH', path, { ...options, body });
  }

  delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('DELETE', path, options);
  }
}

export const apiClient = new ApiClient({
  baseUrl: typeof API_PATH !== 'undefined' ? API_PATH : '',
});
