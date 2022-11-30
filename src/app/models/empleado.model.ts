import { Cargo } from "./cargo.model";
import { Roles } from "./roles.model";

export class Empleado {
  IdEmpleado?: number;
  DniEmpleado?: string;
  ApeEmpleado?: string;
  NomEmpleado?: string;
  Telefono?: string;
  cargo?:Cargo;
  rol?:Roles;
  FechaContrato?: Date;
  SueldoEmpleado?: string;
  Estado?: number;
}
