import { z } from 'zod';

export const createCargoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  codigo: z.string().min(1, 'El código es requerido'),
  codigoDepartamento: z
    .string()
    .min(1, 'El código de departamento es requerido'),
});

export const updateCargoSchema = z.object({
  id: z.number(),
  nombre: z.string().min(1, 'El nombre es requerido'),
  codigo: z.string().min(1, 'El código es requerido'),
  codigoDepartamento: z
    .string()
    .min(1, 'El código de departamento es requerido'),
});

export type CreateCargoInput = z.infer<typeof createCargoSchema>;
export type UpdateCargoInput = z.infer<typeof updateCargoSchema>;
