import { apiClient } from '@/config/axios.config';
import type { Departamento } from '@/types/departamento';
import type {
  CreateDepartamentoInput,
  UpdateDepartamentoInput,
} from './departamentos.schema';

export const getDepartamentos = async () => {
  const response = await apiClient.get<Departamento[]>('/departamentos');

  return response.data;
};

export const createDepartamento = async (data: CreateDepartamentoInput) => {
  const response = await apiClient.post<Departamento>('/departamentos', data);

  return response.data;
};

export const updateDepartamento = async (
  id: number,
  data: UpdateDepartamentoInput
) => {
  const response = await apiClient.patch<Departamento>(
    `/departamentos/${id}`,
    data
  );

  return response.data;
};

export const deleteDepartamento = async (id: number) => {
  const response = await apiClient.delete(`/departamentos/${id}`);

  return response.data;
};
