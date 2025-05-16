export interface Cargo {
  id: number;
  nombre: string;
  codigo: string;
  codigoDepartamento: string;
  departamento: Departamento;
}

export interface Departamento {
  id: number;
  nombre: string;
  codigo: string;
}
