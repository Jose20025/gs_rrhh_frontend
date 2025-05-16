import type { User } from '@/types/user';
import type { LoginSchema } from './auth.schema';

export const login = async (credentials: LoginSchema) => {
  // TODO: Implementar el método de login
  const userMock: User = {
    id: 1,
    name: 'Joseca',
    username: 'joseca',
  };

  return new Promise<User>((resolve) => {
    setTimeout(() => {
      resolve(userMock);
    }, 1000);
  });
};
