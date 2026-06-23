import { ERROR_MESSAGES } from '../../core/constants/validation.constants';

export class FacilityService {
  constructor(facilityApi) {
    this.facilityApi = facilityApi;
  }

  async getAll() {
    const response = await this.facilityApi.getAll();
    return response?.data || [];
  }

  async getById(id) {
    const response = await this.facilityApi.getById(id);
    if (!response?.data) {
      throw new Error(ERROR_MESSAGES.NOT_FOUND);
    }
    return response.data;
  }

  async create(data) {
    if (!data.name || !data.description || !data.capacity) {
      throw new Error(ERROR_MESSAGES.REQUIRED_FIELD);
    }
    if (data.capacity < 1) {
      throw new Error('La capacidad debe ser mayor a 0');
    }

    const response = await this.facilityApi.create(data);
    if (!response?.data) {
      throw new Error(ERROR_MESSAGES.GENERIC_ERROR);
    }
    return response.data;
  }

  async update(id, data) {
    const response = await this.facilityApi.update(id, data);
    if (!response?.data) {
      throw new Error(ERROR_MESSAGES.GENERIC_ERROR);
    }
    return response.data;
  }

  async delete(id) {
    await this.facilityApi.delete(id);
  }
}
