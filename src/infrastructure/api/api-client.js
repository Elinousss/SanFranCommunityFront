import axios from 'axios';
import { API_CONSTANTS } from '../../core/constants/api.constants';

export class ApiClient {
  constructor(baseUrl, timeout) {
    this.baseUrl = baseUrl || API_CONSTANTS.BASE_URL;
    this.timeout = timeout || API_CONSTANTS.TIMEOUT;
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
      headers: API_CONSTANTS.HEADERS,
    });
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
    try {
      const headers = {
        ...API_CONSTANTS.HEADERS,
        ...(options.headers || {}),
      };

      if (typeof FormData !== 'undefined' && options.body instanceof FormData) {
        delete headers['Content-Type'];
      }

      const { body, method = 'GET', ...config } = options;
      const response = await this.client.request({
        ...config,
        url: endpoint,
        method,
        data: body,
        headers,
      });

      return response.data ?? {};
    } catch (error) {
      throw this.handleException(error);
    }
  }

  handleException(error) {
    if (axios.isAxiosError(error)) {
      const payload = error.response?.data?.data || error.response?.data;
      if (error.code === 'ECONNABORTED') {
        return new Error('La solicitud tardó demasiado. Intenta nuevamente');
      }
      if (error.response) {
        return new Error(
          payload?.message || payload?.error || `${error.response.status} ${error.response.statusText}`
        );
      }
      return new Error('Error de conexión. Verifica tu internet');
    }
    return error instanceof Error ? error : new Error('Error desconocido');
  }

  setBaseUrl(url) {
    this.baseUrl = url;
    this.client.defaults.baseURL = url;
  }

  getBaseUrl() {
    return this.baseUrl;
  }
}
