const STORAGE_KEYS = {
  USER: 'san_fran_user',
  TOKEN: 'san_fran_token',
  API_URL: 'san_fran_api_url',
  THEME: 'san_fran_theme',
  LANGUAGE: 'san_fran_language',
};

export class LocalStorageService {
  static setUser(user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  static getUser() {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  }

  static removeUser() {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  static setToken(token) {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  }

  static getToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  }

  static removeToken() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  }

  static setApiUrl(url) {
    localStorage.setItem(STORAGE_KEYS.API_URL, url);
  }

  static getApiUrl() {
    return localStorage.getItem(STORAGE_KEYS.API_URL);
  }

  static clearAuth() {
    this.removeUser();
    this.removeToken();
  }

  static clearAll() {
    localStorage.clear();
  }
}
