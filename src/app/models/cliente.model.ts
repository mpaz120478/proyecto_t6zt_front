import { Departamento } from "./departamento.model";

export class Cliente {
  IdCliente?: number;
  DocCliente?: number;
  DatosCliente?: string;
  DirecCliente?: string;
  FonoCliente?: string;
  EmailCliente?: string;
  Estado?: number;
  FechaRegistro?: Date;
  dpto?: Departamento;
}
