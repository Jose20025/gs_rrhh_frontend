import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Cargo } from '@/types/cargo';
import type { UpdateCargoInput } from '../cargos.schema';
import { CargoForm } from './CargoForm';

interface EditCargoModalProps {
  cargo: Cargo;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateCargoInput) => Promise<void>;
  isSubmitting?: boolean;
}

export function EditCargoModal({
  cargo,
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: EditCargoModalProps) {
  const handleSubmit = async (data: UpdateCargoInput) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Cargo</DialogTitle>
        </DialogHeader>
        <CargoForm
          cargo={cargo}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
