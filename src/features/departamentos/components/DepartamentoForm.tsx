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
import type { Departamento } from '@/types/departamento';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type {
  CreateDepartamentoInput,
  UpdateDepartamentoInput,
} from '../departamentos.schema';
import {
  createDepartamentoSchema,
  updateDepartamentoSchema,
} from '../departamentos.schema';

interface DepartamentoFormProps {
  onSubmit: (data: CreateDepartamentoInput | UpdateDepartamentoInput) => void;
  departamento?: Departamento;
  isSubmitting?: boolean;
}

export function DepartamentoForm({
  onSubmit,
  departamento,
  isSubmitting,
}: DepartamentoFormProps) {
  const form = useForm<CreateDepartamentoInput | UpdateDepartamentoInput>({
    resolver: zodResolver(
      departamento ? updateDepartamentoSchema : createDepartamentoSchema
    ),
    defaultValues: departamento || {
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
                <Input placeholder="Nombre del departamento" {...field} />
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
                <Input placeholder="Código del departamento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {departamento ? 'Actualizar' : 'Crear'} Departamento
        </Button>
      </form>
    </Form>
  );
}
