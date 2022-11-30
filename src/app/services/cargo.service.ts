import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Cargo } from '../models/cargo.model';

const baseUrl = AppSettings.API_ENDPOINT+ '/cargos'

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http:HttpClient) { }

  registrarCargo(obj:Cargo):Observable<any> {
    return this.http.post(baseUrl + "/registraCargo", obj);
  }

  actualizarCargo(obj:Cargo):Observable<any> {
    return this.http.put(baseUrl + "/actualizaCargo", obj)
  }

  eliminarCargo(IdCargo:number):Observable<any> {
    return this.http.delete(baseUrl + "/eliminaCargo"+ IdCargo);
  }
}
