import { ApiFactory } from './api/api.factory';
import { AuthRepository } from './repositories/auth.repository';
import { UserRepository } from './repositories/user.repository';
import { FacilityRepository } from './repositories/facility.repository';
import { ReservationRepository } from './repositories/reservation.repository';
import { AuthService } from '../application/services/auth.service';
import { UserService } from '../application/services/user.service';
import { FacilityService } from '../application/services/facility.service';
import { ReservationService } from '../application/services/reservation.service';

export class ServiceLocator {
  static instance = null;

  constructor(baseUrl) {
    this.apiFactory = ApiFactory.getInstance(baseUrl);
    this.authService = new AuthService(new AuthRepository(this.apiFactory.authApi));
    this.userService = new UserService(new UserRepository(this.apiFactory.userApi));
    this.facilityService = new FacilityService(new FacilityRepository(this.apiFactory.facilityApi));
    this.reservationService = new ReservationService(new ReservationRepository(this.apiFactory.reservationApi));
  }

  static getInstance(baseUrl) {
    if (!ServiceLocator.instance) {
      ServiceLocator.instance = new ServiceLocator(baseUrl);
    } else if (baseUrl) {
      ServiceLocator.instance.apiFactory.setBaseUrl(baseUrl);
    }
    return ServiceLocator.instance;
  }
}
