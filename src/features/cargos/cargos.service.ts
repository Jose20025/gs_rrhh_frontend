import { apiClient } from '@/config/axios.config';
import type { Cargo } from '@/types/cargo';
import type { CreateCargoInput, UpdateCargoInput } from './cargos.schema';

export const getCargos = async (): Promise<Cargo[]> => {
  const response = await apiClient.get<Cargo[]>('/cargos');

  return response.data;
};

export const createCargo = async (data: CreateCargoInput): Promise<Cargo> => {
  const response = await apiClient.post<Cargo>('/cargos', data);

  return response.data;
};

export const updateCargo = async (
  id: number,
  data: UpdateCargoInput
): Promise<Cargo> => {
  const response = await apiClient.patch<Cargo>(`/cargos/${id}`, data);

  return response.data;
};

export const deleteCargo = async (id: number): Promise<void> => {
  await apiClient.delete(`/cargos/${id}`);
};
