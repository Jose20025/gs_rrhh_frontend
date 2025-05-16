import { z } from 'zod';

export const createDepartamentoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  codigo: z.string().min(1, 'El código es requerido'),
});

export const updateDepartamentoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  codigo: z.string().min(1, 'El código es requerido'),
});

export type CreateDepartamentoInput = z.infer<typeof createDepartamentoSchema>;
export type UpdateDepartamentoInput = z.infer<typeof updateDepartamentoSchema>;
