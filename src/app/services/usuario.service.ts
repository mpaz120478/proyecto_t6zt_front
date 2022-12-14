import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Usuario } from '../models/usuario.model';

const baseUrl = AppSettings.API_ENDPOINT+ '/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  consultaPorApellidos(filtro:string):Observable<Usuario[]>{
    return this.http.get<Usuario[]>(baseUrl +"/listaUsuarioPorApellidoLike/"+filtro);
  }

  registrarUsuario(obj:Usuario):Observable<any> {
    return this.http.post(baseUrl + "/registraUsuario", obj);
  }

  actualizarUsuario(obj:Usuario):Observable<any> {
    return this.http.put(baseUrl + "/actualizaUsuario", obj);
  }

  eliminarUsuario(idUsuario:number):Observable<any> {
    return this.http.delete(baseUrl + "/eliminaUsuario/"+ idUsuario);
  }
}
