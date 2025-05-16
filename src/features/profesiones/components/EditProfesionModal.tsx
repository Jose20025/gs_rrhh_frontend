import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Profesion } from '@/types/profesion';
import type { UpdateProfesionInput } from '../profesiones.schema';
import { ProfesionForm } from './ProfesionForm';

interface EditProfesionModalProps {
  profesion: Profesion;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateProfesionInput) => Promise<void>;
  isSubmitting?: boolean;
}

export function EditProfesionModal({
  profesion,
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: EditProfesionModalProps) {
  const handleSubmit = async (data: UpdateProfesionInput) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Profesión</DialogTitle>
        </DialogHeader>
        <ProfesionForm
          profesion={profesion}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
