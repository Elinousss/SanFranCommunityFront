import { API_ENDPOINTS } from '../../core/constants/api.constants';

export class UserApi {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async getAll() {
    return this.apiClient.get(API_ENDPOINTS.USERS.GET_ALL);
  }

  async getById(id) {
    return this.apiClient.get(API_ENDPOINTS.USERS.GET_ONE(id));
  }

  async search(email) {
    return this.apiClient.get(API_ENDPOINTS.USERS.SEARCH(email));
  }

  async update(id, data) {
    return this.apiClient.put(API_ENDPOINTS.USERS.UPDATE(id), data);
  }

  async create(data) {
    return this.apiClient.post(API_ENDPOINTS.USERS.CREATE, data);
  }

  async delete(id) {
    return this.apiClient.delete(API_ENDPOINTS.USERS.DELETE(id));
  }
}
