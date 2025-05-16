import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { Departamento } from '@/types/departamento';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  CreateDepartamentoModal,
  DepartamentosTable,
  EditDepartamentoModal,
} from '../components';
import type {
  CreateDepartamentoInput,
  UpdateDepartamentoInput,
} from '../departamentos.schema';
import {
  createDepartamento,
  deleteDepartamento,
  getDepartamentos,
  updateDepartamento,
} from '../departamentos.service';

export function DepartamentosPage() {
  const [departamentoToEdit, setDepartamentoToEdit] =
    useState<Departamento | null>(null);
  const [departamentoToDelete, setDepartamentoToDelete] = useState<
    number | null
  >(null);

  const queryClient = useQueryClient();

  const { data: departamentos = [], isLoading } = useQuery({
    queryKey: ['departamentos'],
    queryFn: getDepartamentos,
  });

  const createMutation = useMutation({
    mutationFn: createDepartamento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departamentos'] });
      toast.success('Departamento creado exitosamente');
    },
    onError: () => {
      toast.error('Error al crear el departamento');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateDepartamentoInput }) =>
      updateDepartamento(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departamentos'] });
      toast.success('Departamento actualizado exitosamente');
    },
    onError: () => {
      toast.error('Error al actualizar el departamento');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDepartamento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departamentos'] });
      toast.success('Departamento eliminado exitosamente');
    },
    onError: () => {
      toast.error('Error al eliminar el departamento');
    },
  });

  const handleCreate = async (data: CreateDepartamentoInput) => {
    await createMutation.mutateAsync(data);
  };

  const handleUpdate = async (data: UpdateDepartamentoInput) => {
    if (!departamentoToEdit) return;
    await updateMutation.mutateAsync({ id: departamentoToEdit.id, data });
    setDepartamentoToEdit(null);
  };

  const handleDelete = async () => {
    if (!departamentoToDelete) return;
    await deleteMutation.mutateAsync(departamentoToDelete);
    setDepartamentoToDelete(null);
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Departamentos</h1>
        <CreateDepartamentoModal
          onSubmit={handleCreate}
          isSubmitting={createMutation.isPending}
        />
      </div>

      <DepartamentosTable
        departamentos={departamentos}
        onEdit={setDepartamentoToEdit}
        onDelete={setDepartamentoToDelete}
      />

      {departamentoToEdit && (
        <EditDepartamentoModal
          departamento={departamentoToEdit}
          isOpen={!!departamentoToEdit}
          onClose={() => setDepartamentoToEdit(null)}
          onSubmit={handleUpdate}
          isSubmitting={updateMutation.isPending}
        />
      )}

      <AlertDialog
        open={!!departamentoToDelete}
        onOpenChange={() => setDepartamentoToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              el departamento.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
