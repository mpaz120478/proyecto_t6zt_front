import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Cargo } from '../models/cargo.model';
import { Cliente } from '../models/cliente.model';
import { Departamento } from '../models/departamento.model';
import { Empleado } from '../models/empleado.model';
import { Roles } from '../models/roles.model';
import { Usuario } from '../models/usuario.model';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  constructor(private http:HttpClient) { }

  listarDptos():Observable<Departamento[]>{
    return this.http.get<Departamento[]>(baseUrlUtil+"/listarDptos");
  }

  listarCargos():Observable<Cargo[]>{
    return this.http.get<Cargo[]>(baseUrlUtil+"/listarCargos");
  }

  listarClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(baseUrlUtil+"/listarClientes");
  }

  listarEmpleados():Observable<Empleado[]>{
    return this.http.get<Empleado[]>(baseUrlUtil+"/listarEmpleados");
  }

  listarRoles():Observable<Roles[]>{
    return this.http.get<Roles[]>(baseUrlUtil+"/listarRoles");
  }

  listarUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(baseUrlUtil+"/listarUsuarios");
  }

}
