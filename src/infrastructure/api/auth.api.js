import { API_ENDPOINTS } from '../../core/constants/api.constants';

export class AuthApi {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async login(credentials) {
    try {
      const users = await this.apiClient.get(`${API_ENDPOINTS.USERS.SEARCH(credentials.email)}`);

      if (!users?.data || users.data.length === 0) {
        throw new Error('Usuario no encontrado');
      }

      return {
        success: true,
        data: users.data[0],
      };
    } catch (err) {
      // If backend returns 404 for the search, treat it as empty result set
      if (err instanceof Error && err.message && err.message.includes('404')) {
        return { success: true, data: [] };
      }
      throw err;
    }
  }

  async register(userData) {
    return this.apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  }

  async logout() {
    return this.apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  }
}
