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
import type { CreateProfesionInput } from '../profesiones.schema';
import { ProfesionForm } from './ProfesionForm';

interface CreateProfesionModalProps {
  onSubmit: (data: CreateProfesionInput) => Promise<void>;
  isSubmitting?: boolean;
}

export function CreateProfesionModal({
  onSubmit,
  isSubmitting,
}: CreateProfesionModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: CreateProfesionInput) => {
    await onSubmit(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Profesión
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Profesión</DialogTitle>
        </DialogHeader>
        <ProfesionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </DialogContent>
    </Dialog>
  );
}
