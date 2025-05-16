import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Profesion } from '@/types/profesion';
import { Edit, Trash } from 'lucide-react';

interface ProfesionesTableProps {
  profesiones: Profesion[];
  onEdit: (profesion: Profesion) => void;
  onDelete: (id: number) => void;
}

export function ProfesionesTable({
  profesiones,
  onEdit,
  onDelete,
}: ProfesionesTableProps) {
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
        {profesiones.map((profesion) => (
          <TableRow key={profesion.id}>
            <TableCell>{profesion.codigo}</TableCell>
            <TableCell>{profesion.nombre}</TableCell>
            <TableCell className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onEdit(profesion)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDelete(profesion.id)}
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
