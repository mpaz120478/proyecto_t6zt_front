import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Categoria } from '../models/categoria.model';

const baseUrl = AppSettings.API_ENDPOINT+ '/categorias';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {

  constructor(private http:HttpClient) { }

  registrarCategoria(obj:Categoria):Observable<any> {
    return this.http.post(baseUrl + "/registraCategoria", obj);
  }

  actualizarCategoria(obj:Categoria):Observable<any> {
    return this.http.put(baseUrl + "/actualizaCategoria", obj);
  }
}
