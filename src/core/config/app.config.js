export const APP_CONFIG = {
  appName: 'SanFran Community',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
  theme: 'light',
  pagination: {
    defaultPageSize: 10,
  },
};
