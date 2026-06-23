import { API_ENDPOINTS } from '../../core/constants/api.constants';

export class ReservationApi {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async getAll() {
    return this.apiClient.get(API_ENDPOINTS.RESERVATIONS.GET_ALL);
  }

  async getById(id) {
    return this.apiClient.get(API_ENDPOINTS.RESERVATIONS.GET_ONE(id));
  }

  async create(data) {
    return this.apiClient.post(API_ENDPOINTS.RESERVATIONS.CREATE, data);
  }

  async update(id, data) {
    return this.apiClient.put(API_ENDPOINTS.RESERVATIONS.UPDATE(id), data);
  }

  async delete(id) {
    return this.apiClient.delete(API_ENDPOINTS.RESERVATIONS.DELETE(id));
  }
}
