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
import type { Cargo } from '@/types/cargo';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { getDepartamentos } from '../../departamentos/departamentos.service';
import type { CreateCargoInput, UpdateCargoInput } from '../cargos.schema';
import { createCargoSchema, updateCargoSchema } from '../cargos.schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CargoFormProps {
  onSubmit: (data: CreateCargoInput | UpdateCargoInput) => void;
  cargo?: Cargo;
  isSubmitting?: boolean;
}

export function CargoForm({ onSubmit, cargo, isSubmitting }: CargoFormProps) {
  const { data: departamentos = [] } = useQuery({
    queryKey: ['departamentos'],
    queryFn: getDepartamentos,
  });

  const form = useForm<CreateCargoInput | UpdateCargoInput>({
    resolver: zodResolver(cargo ? updateCargoSchema : createCargoSchema),
    defaultValues: cargo || {
      nombre: '',
      codigo: '',
      codigoDepartamento: '',
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
                <Input placeholder="Nombre del cargo" {...field} />
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
                <Input placeholder="Código del cargo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="codigoDepartamento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departamento</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un departamento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {departamentos.map((departamento) => (
                    <SelectItem
                      key={departamento.id}
                      value={departamento.codigo}
                    >
                      {departamento.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {cargo ? 'Actualizar' : 'Crear'} Cargo
        </Button>
      </form>
    </Form>
  );
}
