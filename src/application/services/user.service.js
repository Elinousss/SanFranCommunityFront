import { ERROR_MESSAGES } from '../../core/constants/validation.constants';

export class UserService {
  constructor(userApi) {
    this.userApi = userApi;
  }

  async getAll() {
    const response = await this.userApi.getAll();
    return response?.data || [];
  }

  async getById(id) {
    const response = await this.userApi.getById(id);
    if (!response?.data) {
      throw new Error(ERROR_MESSAGES.NOT_FOUND);
    }
    return response.data;
  }

  async search(email) {
    const response = await this.userApi.search(email);
    return response?.data || [];
  }

  async update(id, data) {
    const response = await this.userApi.update(id, data);
    if (!response?.data) {
      throw new Error(ERROR_MESSAGES.GENERIC_ERROR);
    }
    return response.data;
  }

  async create(data) {
    const response = await this.userApi.create(data);
    if (!response?.data) {
      throw new Error(ERROR_MESSAGES.GENERIC_ERROR);
    }
    return response.data;
  }

  async delete(id) {
    await this.userApi.delete(id);
  }
}
