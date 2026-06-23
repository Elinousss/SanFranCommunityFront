export class UserRepository {
  constructor(userApi) {
    this.userApi = userApi;
  }

  async getAll() {
    return this.userApi.getAll();
  }

  async getById(id) {
    return this.userApi.getById(id);
  }

  async search(email) {
    return this.userApi.search(email);
  }

  async update(id, data) {
    return this.userApi.update(id, data);
  }

  async create(data) {
    return this.userApi.create(data);
  }

  async delete(id) {
    return this.userApi.delete(id);
  }
}
