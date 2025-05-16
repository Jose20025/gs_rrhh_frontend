import { z } from 'zod';

export const createProfesionSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  codigo: z.string().min(1, 'El código es requerido'),
});

export const updateProfesionSchema = z.object({
  id: z.number(),
  nombre: z.string().min(1, 'El nombre es requerido'),
  codigo: z.string().min(1, 'El código es requerido'),
});

export type CreateProfesionInput = z.infer<typeof createProfesionSchema>;
export type UpdateProfesionInput = z.infer<typeof updateProfesionSchema>;
