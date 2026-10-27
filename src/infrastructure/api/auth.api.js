import { API_ENDPOINTS } from '../../core/constants/api.constants';

export class AuthApi {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async login(credentials) {
    return this.apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  }

  async register(userData) {
    return this.apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  }

  async logout() {
    return this.apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  }
}
