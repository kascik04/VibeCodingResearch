import { useCallback, useEffect, useMemo, useState } from 'react';
import { history } from 'umi';
import type { LoginResponse } from '@/services/auth';
import { getProfile } from '@/services/auth';

const ACCESS_TOKEN_KEY = 'accessToken';
const USER_KEY = 'authUser';

const isBrowser = () => typeof window !== 'undefined';

const clearPersistedAuth = () => {
  if (!isBrowser()) return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.sessionStorage.removeItem(USER_KEY);
};

const persistAuth = (
  user: LoginResponse['user'],
  token: string,
  rememberMe: boolean,
) => {
  if (!isBrowser()) return;
  const target = rememberMe ? window.localStorage : window.sessionStorage;
  const opposite = rememberMe ? window.sessionStorage : window.localStorage;
  opposite.removeItem(ACCESS_TOKEN_KEY);
  opposite.removeItem(USER_KEY);
  target.setItem(ACCESS_TOKEN_KEY, token);
  target.setItem(USER_KEY, JSON.stringify(user));
};

const readPersistedAuth = (): {
  token: string | null;
  user: LoginResponse['user'] | null;
} => {
  if (!isBrowser()) {
    return { token: null, user: null };
  }
  const token =
    window.localStorage.getItem(ACCESS_TOKEN_KEY) ||
    window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
  const rawUser =
    window.localStorage.getItem(USER_KEY) ||
    window.sessionStorage.getItem(USER_KEY);
  let user: LoginResponse['user'] | null = null;
  if (rawUser) {
    try {
      user = JSON.parse(rawUser);
    } catch (error) {
      user = null;
    }
  }
  return { token, user };
};

export default function useAuthModel() {
  const persisted = useMemo(() => readPersistedAuth(), []);
  const [currentUser, setCurrentUser] = useState<LoginResponse['user'] | null>(
    persisted.user,
  );
  const [hasToken, setHasToken] = useState<boolean>(Boolean(persisted.token));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    Boolean(persisted.token && persisted.user),
  );
  const [isBootstrapping, setIsBootstrapping] = useState<boolean>(
    Boolean(persisted.token && !persisted.user),
  );

  useEffect(() => {
    if (!persisted.token) {
      setIsBootstrapping(false);
      return;
    }
    if (persisted.user) {
      setIsBootstrapping(false);
      return;
    }
    const hydrateProfile = async () => {
      try {
        const profile = await getProfile();
        setCurrentUser(profile);
        setIsAuthenticated(true);
      } catch (error) {
        clearPersistedAuth();
        setCurrentUser(null);
        setIsAuthenticated(false);
        setHasToken(false);
      } finally {
        setIsBootstrapping(false);
      }
    };
    hydrateProfile();
  }, [persisted.token, persisted.user]);

  const setAuth = useCallback(
    (data: LoginResponse, rememberMe = true) => {
      persistAuth(data.user, data.accessToken, rememberMe);
      setCurrentUser(data.user);
      setIsAuthenticated(true);
      setHasToken(true);
    },
    [],
  );

  const logout = useCallback(() => {
    clearPersistedAuth();
    setCurrentUser(null);
    setIsAuthenticated(false);
    setHasToken(false);
    history.push('/login');
  }, []);

  return {
    currentUser,
    isAuthenticated,
    hasToken,
    isBootstrapping,
    setAuth,
    logout,
  };
}