import { ERROR_MESSAGES } from '../../core/constants/validation.constants';

export class ReservationService {
  constructor(reservationApi) {
    this.reservationApi = reservationApi;
  }

  async getAll() {
    const response = await this.reservationApi.getAll();
    return response?.data || [];
  }

  async getById(id) {
    const response = await this.reservationApi.getById(id);
    if (!response?.data) {
      throw new Error(ERROR_MESSAGES.NOT_FOUND);
    }
    return response.data;
  }

  async create(data) {
    if (!data.userId || !data.facilityId || !data.date || !data.startTime || !data.endTime) {
      throw new Error(ERROR_MESSAGES.REQUIRED_FIELD);
    }
    const response = await this.reservationApi.create(data);
    if (!response?.data) {
      throw new Error(ERROR_MESSAGES.GENERIC_ERROR);
    }
    return response.data;
  }

  async update(id, data) {
    const response = await this.reservationApi.update(id, data);
    if (!response?.data) {
      throw new Error(ERROR_MESSAGES.GENERIC_ERROR);
    }
    return response.data;
  }

  async delete(id) {
    await this.reservationApi.delete(id);
  }
}
