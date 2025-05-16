import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Departamento } from '@/types/departamento';
import { Edit, Trash } from 'lucide-react';

interface DepartamentosTableProps {
  departamentos: Departamento[];
  onEdit: (departamento: Departamento) => void;
  onDelete: (id: number) => void;
}

export function DepartamentosTable({
  departamentos,
  onEdit,
  onDelete,
}: DepartamentosTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead className="w-[100px]">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {departamentos.map((departamento) => (
          <TableRow key={departamento.id}>
            <TableCell>{departamento.codigo}</TableCell>
            <TableCell>{departamento.nombre}</TableCell>
            <TableCell className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onEdit(departamento)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDelete(departamento.id)}
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
