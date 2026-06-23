import { API_CONSTANTS } from '../../core/constants/api.constants';

export class ApiClient {
  constructor(baseUrl, timeout) {
    this.baseUrl = baseUrl || API_CONSTANTS.BASE_URL;
    this.timeout = timeout || API_CONSTANTS.TIMEOUT;
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });
  }

  async put(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  async patch(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async request(endpoint, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const url = `${this.baseUrl}${endpoint}`;
      const headers = {
        ...API_CONSTANTS.HEADERS,
        ...(options.headers || {}),
      };

      if (options.body instanceof FormData) {
        delete headers['Content-Type'];
      }

      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        await this.handleError(response);
      }

      const text = await response.text();
      return text ? JSON.parse(text) : {};
    } catch (error) {
      clearTimeout(timeoutId);
      throw this.handleException(error);
    }
  }

  async handleError(response) {
    const contentType = response.headers.get('content-type');
    let errorPayload = {
      status: response.status,
      statusText: response.statusText,
    };

    try {
      if (contentType?.includes('application/json')) {
        errorPayload = await response.json();
        errorPayload = errorPayload?.data || errorPayload;
      }
    } catch {
      // Ignore parse errors
    }

    const message = errorPayload?.message || errorPayload?.error || `${errorPayload?.status || response.status} ${response.statusText}`;
    throw new Error(message);
  }

  handleException(error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      return new Error('Error de conexión. Verifica tu internet');
    }
    if (error instanceof DOMException && error.name === 'AbortError') {
      return new Error('La solicitud tardó demasiado. Intenta nuevamente');
    }
    return error instanceof Error ? error : new Error('Error desconocido');
  }

  setBaseUrl(url) {
    this.baseUrl = url;
  }

  getBaseUrl() {
    return this.baseUrl;
  }
}
