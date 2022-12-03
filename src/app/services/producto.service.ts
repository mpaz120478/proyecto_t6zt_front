import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Empleado } from '../models/empleado.model';
import { Producto } from '../models/producto.model';

const baseUrl = AppSettings.API_ENDPOINT+ '/productos';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  constructor(private http:HttpClient) { }

  listarProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(baseUrl+"/listarProductos");
  }

  consultaPorNombre(filtro:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(baseUrl +"/listaPorNombreLike/"+filtro);
  }

  registrarProducto(obj:Producto):Observable<any> {
    return this.http.post(baseUrl + "/registraProducto", obj);
  }

  actualizarProducto(obj:Producto):Observable<any> {
    return this.http.put(baseUrl + "/actualizaProducto", obj);
  }
}
