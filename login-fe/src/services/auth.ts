import api from '@/utils/request';

export interface LoginPayload {
  identifier: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: {
    id: number;
    email: string;
    name: string;
  };
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export type UserProfile = LoginResponse['user'];

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await api.post('/auth/login', payload);
  return res.data;
}

export async function getProfile(): Promise<UserProfile> {
  const res = await api.get('/auth/me');
  return res.data;
}