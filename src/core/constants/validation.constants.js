export const VALIDATION_CONSTANTS = {
  PASSWORD: {
    MIN_LENGTH: 8,
    ERROR_MESSAGE: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
  },
  EMAIL: {
    REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    ERROR_MESSAGE: 'El email no es válido',
  },
  ID_DOCUMENT: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 20,
    ERROR_MESSAGE: 'El documento debe tener entre 5 y 20 caracteres',
  },
  NAMES: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100,
    ERROR_MESSAGE: 'El nombre debe tener entre 3 y 100 caracteres',
  },
};

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Este campo es requerido',
  INVALID_EMAIL: 'Email inválido',
  PASSWORDS_NOT_MATCH: 'Las contraseñas no coinciden',
  PASSWORD_TOO_SHORT: 'La contraseña es muy corta',
  GENERIC_ERROR: 'Algo salió mal. Intenta nuevamente',
  UNAUTHORIZED: 'Email o contraseña incorrectos',
  CONFLICT: 'Este usuario ya existe',
  NOT_FOUND: 'Recurso no encontrado',
  FORBIDDEN: 'No tienes permiso para acceder',
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet',
};
