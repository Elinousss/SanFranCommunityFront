export class ReservationRepository {
  constructor(reservationApi) {
    this.reservationApi = reservationApi;
  }

  async getAll() {
    return this.reservationApi.getAll();
  }

  async getById(id) {
    return this.reservationApi.getById(id);
  }

  async create(data) {
    return this.reservationApi.create(data);
  }

  async update(id, data) {
    return this.reservationApi.update(id, data);
  }

  async delete(id) {
    return this.reservationApi.delete(id);
  }
}
