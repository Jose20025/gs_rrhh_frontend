import type { User } from '@/types/user';
import type { LoginSchema } from './auth.schema';
import { apiClient } from '@/config/axios.config';

export const login = async (credentials: LoginSchema) => {
  const response = await apiClient.post<User>('/usuarios/login', credentials);

  return response.data;
};
