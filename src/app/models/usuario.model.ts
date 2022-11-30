import { Empleado } from "./empleado.model";

export class Usuario {
  IdUsuario?: number;
  empleado?: Empleado;
  DniEmpleado?: string;
  ApeEmpleado?: string;
  NomEmpleado?: string;
  NomUsuario?: string;
  ClaveUsuario?: string;
  FechaRegistro?: Date;
  Estado?: number;
}
