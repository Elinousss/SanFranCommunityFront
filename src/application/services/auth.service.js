import { VALIDATION_CONSTANTS, ERROR_MESSAGES } from '../../core/constants/validation.constants';
import { RoleEnum, SubRoleEnum } from '../../core/enums/role.enum';
import { LoginDto, RegisterDto } from '../dto/auth.dto';

export class AuthService {
  constructor(authApi) {
    this.authApi = authApi;
  }

  async login(credentials) {
    const payload = LoginDto(credentials);
    this.validateLoginInput(payload);

    const response = await this.authApi.login(payload);
    if (!response?.data) {
      throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
    }

    const normalizedEmail = String(response.data.email || '').toLowerCase();
    const userData = {
      ...response.data,
      role:
        String(response.data.role || '').trim().toUpperCase() === RoleEnum.ADMIN
          ? RoleEnum.ADMIN
          : normalizedEmail === 'admin@sanfran.com'
          ? RoleEnum.ADMIN
          : response.data.role || RoleEnum.RESIDENT,
    };

    return {
      user: userData,
      token: this.generateMockToken(response.data.id),
    };
  }

  async register(data) {
    const payload = RegisterDto(data);
    this.validateRegisterInput(payload);

    if (payload.password !== payload.confirmPassword) {
      throw new Error(ERROR_MESSAGES.PASSWORDS_NOT_MATCH);
    }

    const requestPayload = {
      names: payload.names,
      email: payload.email,
      idDocument: payload.idDocument,
      password: payload.password,
      role: RoleEnum.RESIDENT,
      subRole: SubRoleEnum.TENANT,
    };

    const response = await this.authApi.register(requestPayload);
    if (!response?.data) {
      throw new Error(ERROR_MESSAGES.GENERIC_ERROR);
    }

    return response.data;
  }

  async logout() {
    // No backend logout route is available in the current API.
    // Keep this method for future compatibility and client-side logout flow.
    await this.authApi.logout();
  }

  validateLoginInput(credentials) {
    if (!credentials.email || !credentials.password) {
      throw new Error(ERROR_MESSAGES.REQUIRED_FIELD);
    }

    if (!VALIDATION_CONSTANTS.EMAIL.REGEX.test(credentials.email)) {
      throw new Error(ERROR_MESSAGES.INVALID_EMAIL);
    }
  }

  validateRegisterInput(data) {
    if (!data.names || !data.email || !data.idDocument || !data.password) {
      throw new Error(ERROR_MESSAGES.REQUIRED_FIELD);
    }

    if (data.names.length < VALIDATION_CONSTANTS.NAMES.MIN_LENGTH) {
      throw new Error(VALIDATION_CONSTANTS.NAMES.ERROR_MESSAGE);
    }

    if (!VALIDATION_CONSTANTS.EMAIL.REGEX.test(data.email)) {
      throw new Error(ERROR_MESSAGES.INVALID_EMAIL);
    }

    if (data.idDocument.length < VALIDATION_CONSTANTS.ID_DOCUMENT.MIN_LENGTH) {
      throw new Error(VALIDATION_CONSTANTS.ID_DOCUMENT.ERROR_MESSAGE);
    }

    if (data.password.length < VALIDATION_CONSTANTS.PASSWORD.MIN_LENGTH) {
      throw new Error(ERROR_MESSAGES.PASSWORD_TOO_SHORT);
    }
  }

  generateMockToken(userId) {
    return `mock_token_${userId}_${Date.now()}`;
  }
}
