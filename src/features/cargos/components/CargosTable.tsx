import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Cargo } from '@/types/cargo';
import { Edit, Trash } from 'lucide-react';

interface CargosTableProps {
  cargos: Cargo[];
  onEdit: (cargo: Cargo) => void;
  onDelete: (id: number) => void;
}

export function CargosTable({ cargos, onEdit, onDelete }: CargosTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Departamento</TableHead>
          <TableHead className="w-[100px]">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cargos.map((cargo) => (
          <TableRow key={cargo.id}>
            <TableCell>{cargo.codigo}</TableCell>
            <TableCell>{cargo.nombre}</TableCell>
            <TableCell>{cargo.departamento.nombre}</TableCell>
            <TableCell className="flex gap-2">
              <Button size="icon" variant="ghost" onClick={() => onEdit(cargo)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDelete(cargo.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
