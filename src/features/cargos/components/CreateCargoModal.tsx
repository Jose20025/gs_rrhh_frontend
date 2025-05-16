import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import type { CreateCargoInput } from '../cargos.schema';
import { CargoForm } from './CargoForm';

interface CreateCargoModalProps {
  onSubmit: (data: CreateCargoInput) => Promise<void>;
  isSubmitting?: boolean;
}

export function CreateCargoModal({
  onSubmit,
  isSubmitting,
}: CreateCargoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: CreateCargoInput) => {
    await onSubmit(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Cargo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Cargo</DialogTitle>
        </DialogHeader>
        <CargoForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </DialogContent>
    </Dialog>
  );
}
