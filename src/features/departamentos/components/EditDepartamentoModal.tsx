import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Departamento } from '@/types/departamento';
import type { UpdateDepartamentoInput } from '../departamentos.schema';
import { DepartamentoForm } from './DepartamentoForm';

interface EditDepartamentoModalProps {
  departamento: Departamento;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateDepartamentoInput) => Promise<void>;
  isSubmitting?: boolean;
}

export function EditDepartamentoModal({
  departamento,
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: EditDepartamentoModalProps) {
  const handleSubmit = async (data: UpdateDepartamentoInput) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Departamento</DialogTitle>
        </DialogHeader>
        <DepartamentoForm
          departamento={departamento}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
