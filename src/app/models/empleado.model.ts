import { Cargo } from "./cargo.model";
import { Roles } from "./roles.model";

export class Empleado {
  idEmpleado?: number;
  dniEmpleado?: string;
  apeEmpleado?: string;
  nomEmpleado?: string;
  emailEmpleado?: string;
  telefono?: string;
  cargo?:Cargo;
  rol?:Roles;
  fechaContrato?: Date;
  sueldoEmpleado?: string;
  estado?: number;
}
