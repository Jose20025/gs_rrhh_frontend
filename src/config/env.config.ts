import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url('La URL de la API debe ser una URL válida'),
});

export const envConfig = envSchema.parse(import.meta.env);
export type EnvConfig = z.infer<typeof envSchema>;
