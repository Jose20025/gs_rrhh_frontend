import type { Profesion } from '@/types/profesion';
import type {
  CreateProfesionInput,
  UpdateProfesionInput,
} from './profesiones.schema';
import { apiClient } from '@/config/axios.config';

export const getProfesiones = async (): Promise<Profesion[]> => {
  const response = await apiClient.get<Profesion[]>('/profesiones');

  return response.data;
};

export const createProfesion = async (
  data: CreateProfesionInput
): Promise<Profesion> => {
  const response = await apiClient.post<Profesion>('/profesiones', data);

  return response.data;
};

export const updateProfesion = async (
  id: number,
  data: UpdateProfesionInput
): Promise<Profesion> => {
  const response = await apiClient.patch<Profesion>(`/profesiones/${id}`, data);

  return response.data;
};

export const deleteProfesion = async (id: number): Promise<void> => {
  await apiClient.delete(`/profesiones/${id}`);
};
