import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Profesion } from '@/types/profesion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type {
  CreateProfesionInput,
  UpdateProfesionInput,
} from '../profesiones.schema';
import {
  createProfesionSchema,
  updateProfesionSchema,
} from '../profesiones.schema';

interface ProfesionFormProps {
  onSubmit: (data: CreateProfesionInput | UpdateProfesionInput) => void;
  profesion?: Profesion;
  isSubmitting?: boolean;
}

export function ProfesionForm({
  onSubmit,
  profesion,
  isSubmitting,
}: ProfesionFormProps) {
  const form = useForm<CreateProfesionInput | UpdateProfesionInput>({
    resolver: zodResolver(
      profesion ? updateProfesionSchema : createProfesionSchema
    ),
    defaultValues: profesion || {
      nombre: '',
      codigo: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de la profesión" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="codigo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código</FormLabel>
              <FormControl>
                <Input placeholder="Código de la profesión" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {profesion ? 'Actualizar' : 'Crear'} Profesión
        </Button>
      </form>
    </Form>
  );
}
