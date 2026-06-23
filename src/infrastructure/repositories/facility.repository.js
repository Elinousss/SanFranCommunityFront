export class FacilityRepository {
  constructor(facilityApi) {
    this.facilityApi = facilityApi;
  }

  async getAll() {
    return this.facilityApi.getAll();
  }

  async getById(id) {
    return this.facilityApi.getById(id);
  }

  async create(data) {
    return this.facilityApi.create(data);
  }

  async update(id, data) {
    return this.facilityApi.update(id, data);
  }

  async delete(id) {
    return this.facilityApi.delete(id);
  }
}
