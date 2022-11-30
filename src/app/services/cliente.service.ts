import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

const baseUrl = AppSettings.API_ENDPOINT+ '/clientes'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }

  consultaPorDatos(filtro:string):Observable<Cliente[]>{
    return this.http.get<Cliente[]>(baseUrl +"/listaClientePorDatosLike/"+filtro);
  }

  registrarCliente(obj:Cliente):Observable<any> {
    return this.http.post(baseUrl + "/registraCliente", obj);
  }

  actualizarCliente(obj:Cliente):Observable<any> {
    return this.http.put(baseUrl + "/actualizaCliente", obj)
  }

  eliminarCliente(IdCliente:number):Observable<any> {
    return this.http.delete(baseUrl + "/eliminaCliente"+ IdCliente);
  }
}
