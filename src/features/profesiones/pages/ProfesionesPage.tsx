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
import type { Profesion } from '@/types/profesion';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  CreateProfesionModal,
  ProfesionesTable,
  EditProfesionModal,
} from '../components';
import type {
  CreateProfesionInput,
  UpdateProfesionInput,
} from '../profesiones.schema';
import {
  createProfesion,
  deleteProfesion,
  getProfesiones,
  updateProfesion,
} from '../profesiones.service';

export default function ProfesionesPage() {
  const [profesionToEdit, setProfesionToEdit] = useState<Profesion | null>(
    null
  );
  const [profesionToDelete, setProfesionToDelete] = useState<number | null>(
    null
  );

  const queryClient = useQueryClient();

  const { data: profesiones = [], isLoading } = useQuery({
    queryKey: ['profesiones'],
    queryFn: getProfesiones,
  });

  const createMutation = useMutation({
    mutationFn: createProfesion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profesiones'] });
      toast.success('Profesión creada exitosamente');
    },
    onError: () => {
      toast.error('Error al crear la profesión');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProfesionInput }) =>
      updateProfesion(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profesiones'] });
      setProfesionToEdit(null);
      toast.success('Profesión actualizada exitosamente');
    },
    onError: () => {
      toast.error('Error al actualizar la profesión');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProfesion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profesiones'] });
      toast.success('Profesión eliminada exitosamente');
    },
    onError: () => {
      toast.error('Error al eliminar la profesión');
    },
  });

  const handleCreate = async (data: CreateProfesionInput) => {
    await createMutation.mutateAsync(data);
  };

  const handleUpdate = async (data: UpdateProfesionInput) => {
    if (!profesionToEdit) return;
    await updateMutation.mutateAsync({ id: profesionToEdit.id, data });
  };

  const handleDelete = async () => {
    if (!profesionToDelete) return;
    await deleteMutation.mutateAsync(profesionToDelete);
    setProfesionToDelete(null);
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profesiones</h1>
        <CreateProfesionModal
          onSubmit={handleCreate}
          isSubmitting={createMutation.isPending}
        />
      </div>

      <ProfesionesTable
        profesiones={profesiones}
        onEdit={setProfesionToEdit}
        onDelete={setProfesionToDelete}
      />

      {profesionToEdit && (
        <EditProfesionModal
          profesion={profesionToEdit}
          isOpen={!!profesionToEdit}
          onClose={() => setProfesionToEdit(null)}
          onSubmit={handleUpdate}
          isSubmitting={updateMutation.isPending}
        />
      )}

      <AlertDialog
        open={!!profesionToDelete}
        onOpenChange={() => setProfesionToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              la profesión.
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
