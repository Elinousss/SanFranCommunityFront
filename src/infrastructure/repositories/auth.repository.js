export class AuthRepository {
  constructor(authApi) {
    this.authApi = authApi;
  }

  async login(credentials) {
    return this.authApi.login(credentials);
  }

  async register(payload) {
    return this.authApi.register(payload);
  }

  async logout() {
    return this.authApi.logout();
  }
}
