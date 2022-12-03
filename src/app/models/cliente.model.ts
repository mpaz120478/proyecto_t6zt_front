import { Departamento } from "./departamento.model";

export class Cliente {
  idCliente?: number;
  docCliente?:string;
  datosCliente?: string;
  fonoCliente?: string;
  emailCliente?: string;
  direcCliente?: string;
  departamento?: Departamento;
  estado?: number;
}
