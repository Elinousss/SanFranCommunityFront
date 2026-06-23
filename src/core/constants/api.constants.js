export const API_CONSTANTS = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1',
  TIMEOUT: 30000,
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/users',
    REGISTER: '/users',
    LOGOUT: '/auth/logout',
  },
  USERS: {
    GET_ALL: '/users',
    GET_ONE: (id) => `/users/${id}`,
    SEARCH: (email) => `/users?email=${email}`,
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
  },
  FACILITIES: {
    GET_ALL: '/facilities',
    GET_ONE: (id) => `/facilities/${id}`,
    CREATE: '/facilities',
    UPDATE: (id) => `/facilities/${id}`,
    DELETE: (id) => `/facilities/${id}`,
  },
  RESERVATIONS: {
    GET_ALL: '/reservations',
    GET_ONE: (id) => `/reservations/${id}`,
    CREATE: '/reservations',
    UPDATE: (id) => `/reservations/${id}`,
    DELETE: (id) => `/reservations/${id}`,
  },
};
