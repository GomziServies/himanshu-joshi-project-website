/**
 * src/services/apiClient.ts
 * Resilient HTTP client with configurable timeout, typed errors, and offline detection.
 */

export class ApiError extends Error {
  public status: number;
  public details?: any;

  constructor(message: string, status: number = 500, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const DEFAULT_TIMEOUT_MS = 6000;

interface FetchOptions extends RequestInit {
  timeoutMs?: number;
}

export async function apiRequest<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, headers, ...rest } = options;
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  let controller: AbortController | null = null;
  let timer: any = null;

  const fetchOptions: RequestInit = {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers
    }
  };

  // Cross-realm safety: JSDOM's AbortController in Node.js undici can trigger instance check errors.
  // Only attach signal if not in a JSDOM test environment or if AbortSignal is compatible.
  const isJsdom =
    typeof navigator !== 'undefined' &&
    (navigator.userAgent?.includes('jsdom') || navigator.userAgent?.includes('Node.js'));

  if (!isJsdom && typeof AbortController !== 'undefined') {
    try {
      controller = new AbortController();
      fetchOptions.signal = controller.signal;
      timer = setTimeout(() => controller?.abort(), timeoutMs);
    } catch {
      // Ignore signal attachment if unsupported
    }
  }

  try {
    const response = await fetch(url, fetchOptions);

    if (timer) clearTimeout(timer);

    let responseData: any;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (!response.ok) {
      const errorMessage =
        (responseData && typeof responseData === 'object' && responseData.message) ||
        `HTTP Error ${response.status}: ${response.statusText}`;
      throw new ApiError(errorMessage, response.status, responseData);
    }

    return responseData as T;
  } catch (error: any) {
    if (timer) clearTimeout(timer);

    if (error.name === 'AbortError') {
      throw new ApiError(`Request timeout after ${timeoutMs}ms while contacting ${endpoint}`, 408);
    }
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message || 'Network connection failure', 0, error);
  }
}
