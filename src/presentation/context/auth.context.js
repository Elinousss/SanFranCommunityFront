import React, { createContext, useCallback, useEffect, useState } from 'react';
import { LocalStorageService } from '../../infrastructure/storage/local-storage.service';
import { ServiceLocator } from '../../infrastructure/service-locator';
import { RoleEnum } from '../../core/enums/role.enum';

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children, initialApiUrl }) => {
  const serviceLocator = ServiceLocator.getInstance(initialApiUrl);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiUrl, setApiUrlState] = useState(serviceLocator.apiFactory.getBaseUrl());
  const authService = serviceLocator.authService;

  useEffect(() => {
    const storedUser = LocalStorageService.getUser();
    const storedToken = LocalStorageService.getToken();
    const storedApiUrl = LocalStorageService.getApiUrl();

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }

    if (storedApiUrl) {
      serviceLocator.apiFactory.setBaseUrl(storedApiUrl);
      setApiUrlState(storedApiUrl);
    }

    setLoading(false);
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const { user: userData, token: authToken } = await authService.login(credentials);
      setUser(userData);
      setToken(authToken);
      LocalStorageService.setUser(userData);
      LocalStorageService.setToken(authToken);
      return { success: true };
    } catch (error) {
      return { success: false, error: error?.message || 'Error al iniciar sesión' };
    } finally {
      setLoading(false);
    }
  }, [authService]);

  const register = useCallback(async (data) => {
    setLoading(true);
    try {
      const userData = await authService.register(data);
      setUser(userData);
      LocalStorageService.setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error?.message || 'Error al registrarse' };
    } finally {
      setLoading(false);
    }
  }, [authService]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      LocalStorageService.clearAuth();
    }
  }, [authService]);

  const isAdmin = useCallback(() => {
    const role = String(user?.role || '').toUpperCase();
    const email = String(user?.email || '').toLowerCase();
    return role === RoleEnum.ADMIN || email === 'admin@sanfran.com';
  }, [user]);

  const isAuthenticated = !!user;

  const setApiUrl = useCallback((url) => {
    serviceLocator.apiFactory.setBaseUrl(url);
    setApiUrlState(url);
    LocalStorageService.setApiUrl(url);
  }, [serviceLocator]);

  const getApiUrl = useCallback(() => serviceLocator.apiFactory.getBaseUrl(), [serviceLocator]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        apiUrl,
        token,
        login,
        register,
        logout,
        isAdmin,
        setApiUrl,
        getApiUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
