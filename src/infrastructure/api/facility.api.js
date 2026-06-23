import { API_ENDPOINTS } from '../../core/constants/api.constants';

export class FacilityApi {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async getAll() {
    return this.apiClient.get(API_ENDPOINTS.FACILITIES.GET_ALL);
  }

  async getById(id) {
    return this.apiClient.get(API_ENDPOINTS.FACILITIES.GET_ONE(id));
  }

  async create(data) {
    return this.apiClient.post(API_ENDPOINTS.FACILITIES.CREATE, data);
  }

  async update(id, data) {
    return this.apiClient.put(API_ENDPOINTS.FACILITIES.UPDATE(id), data);
  }

  async delete(id) {
    return this.apiClient.delete(API_ENDPOINTS.FACILITIES.DELETE(id));
  }
}
