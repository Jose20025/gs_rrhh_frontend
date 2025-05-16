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
import type { Cargo } from '@/types/cargo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { CreateCargoModal, CargosTable, EditCargoModal } from '../components';
import type { CreateCargoInput, UpdateCargoInput } from '../cargos.schema';
import {
  createCargo,
  deleteCargo,
  getCargos,
  updateCargo,
} from '../cargos.service';

export function CargosPage() {
  const [cargoToEdit, setCargoToEdit] = useState<Cargo | null>(null);
  const [cargoToDelete, setCargoToDelete] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const { data: cargos = [], isLoading } = useQuery({
    queryKey: ['cargos'],
    queryFn: getCargos,
  });

  const createMutation = useMutation({
    mutationFn: createCargo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cargos'] });
      toast.success('Cargo creado exitosamente');
    },
    onError: () => {
      toast.error('Error al crear el cargo');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCargoInput }) =>
      updateCargo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cargos'] });
      toast.success('Cargo actualizado exitosamente');
    },
    onError: () => {
      toast.error('Error al actualizar el cargo');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCargo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cargos'] });
      toast.success('Cargo eliminado exitosamente');
    },
    onError: () => {
      toast.error('Error al eliminar el cargo');
    },
  });

  const handleCreate = async (data: CreateCargoInput) => {
    await createMutation.mutateAsync(data);
  };

  const handleUpdate = async (data: UpdateCargoInput) => {
    if (!cargoToEdit) return;
    await updateMutation.mutateAsync({ id: cargoToEdit.id, data });
    setCargoToEdit(null);
  };

  const handleDelete = async () => {
    if (!cargoToDelete) return;
    await deleteMutation.mutateAsync(cargoToDelete);
    setCargoToDelete(null);
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cargos</h1>
        <CreateCargoModal
          onSubmit={handleCreate}
          isSubmitting={createMutation.isPending}
        />
      </div>

      <CargosTable
        cargos={cargos}
        onEdit={setCargoToEdit}
        onDelete={setCargoToDelete}
      />

      {cargoToEdit && (
        <EditCargoModal
          cargo={cargoToEdit}
          isOpen={!!cargoToEdit}
          onClose={() => setCargoToEdit(null)}
          onSubmit={handleUpdate}
          isSubmitting={updateMutation.isPending}
        />
      )}

      <AlertDialog
        open={!!cargoToDelete}
        onOpenChange={() => setCargoToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              el cargo.
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
