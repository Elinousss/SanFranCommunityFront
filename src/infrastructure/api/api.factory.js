import { ApiClient } from './api-client';
import { AuthApi } from './auth.api';
import { UserApi } from './user.api';
import { FacilityApi } from './facility.api';
import { ReservationApi } from './reservation.api';

export class ApiFactory {
  static instance = null;

  constructor(baseUrl) {
    this.apiClient = new ApiClient(baseUrl);
    this.authApi = new AuthApi(this.apiClient);
    this.userApi = new UserApi(this.apiClient);
    this.facilityApi = new FacilityApi(this.apiClient);
    this.reservationApi = new ReservationApi(this.apiClient);
  }

  static getInstance(baseUrl) {
    if (!ApiFactory.instance) {
      ApiFactory.instance = new ApiFactory(baseUrl);
    } else if (baseUrl) {
      ApiFactory.instance.setBaseUrl(baseUrl);
    }
    return ApiFactory.instance;
  }

  setBaseUrl(url) {
    this.apiClient.setBaseUrl(url);
  }

  getBaseUrl() {
    return this.apiClient.getBaseUrl();
  }
}
