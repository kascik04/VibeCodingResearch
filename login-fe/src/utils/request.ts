import axios from 'axios';

const ACCESS_TOKEN_KEY = 'accessToken';

const readToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  return (
    window.localStorage.getItem(ACCESS_TOKEN_KEY) ||
    window.sessionStorage.getItem(ACCESS_TOKEN_KEY)
  );
};

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = readToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default api;