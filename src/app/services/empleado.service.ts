import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Empleado } from '../models/empleado.model';

const baseUrl = AppSettings.API_ENDPOINT+ '/empleados';

@Injectable({
  providedIn: 'root'
})

export class EmpleadoService {

  constructor(private http:HttpClient) { }

  consultaPorApellidos(filtro:string):Observable<Empleado[]>{
    return this.http.get<Empleado[]>(baseUrl +"/listaEmpleadoPorApellidoLike/"+filtro);
  }

  registrarEmpleado(obj:Empleado):Observable<any> {
    return this.http.post(baseUrl + "/registraEmpleado", obj);
  }

  actualizarEmpleado(obj:Empleado):Observable<any> {
    return this.http.put(baseUrl + "/actualizaEmpleado", obj);
  }

  eliminarEmpleado(idEmpleado:number):Observable<any> {
    return this.http.delete(baseUrl + "/eliminaEmpleado/"+ idEmpleado);
  }
}
