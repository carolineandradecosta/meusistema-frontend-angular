import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiUrl = `${environment.api}`;

  constructor(private UsuarioHttp: HttpClient) { }

  register(usuario: Usuario): Observable<Usuario> {
    return this.UsuarioHttp.post<Usuario>(`${this.apiUrl}/auth/register`, usuario);
  }

  listar(): Observable<Usuario[]> {
    return this.UsuarioHttp.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

   buscarPorId(id: number): Observable<Usuario> {
    return this.UsuarioHttp.get<Usuario>(`${this.apiUrl}/usuarios/${id}`);
  }

  atualizar(id: number, usuario: Usuario): Observable<Usuario> {
    return this.UsuarioHttp.put<Usuario>(`${this.apiUrl}/usuarios/${id}`, usuario);
  }

  deletar(id: number): Observable<void> {
    return this.UsuarioHttp.delete<void>(`${this.apiUrl}/usuarios/${id}`);
  }

}
