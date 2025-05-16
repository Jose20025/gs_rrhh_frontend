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
import type { CreateDepartamentoInput } from '../departamentos.schema';
import { DepartamentoForm } from './DepartamentoForm';

interface CreateDepartamentoModalProps {
  onSubmit: (data: CreateDepartamentoInput) => Promise<void>;
  isSubmitting?: boolean;
}

export function CreateDepartamentoModal({
  onSubmit,
  isSubmitting,
}: CreateDepartamentoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: CreateDepartamentoInput) => {
    await onSubmit(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Departamento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Departamento</DialogTitle>
        </DialogHeader>
        <DepartamentoForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </DialogContent>
    </Dialog>
  );
}
