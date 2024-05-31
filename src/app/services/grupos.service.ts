import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Grupo } from '../interfaces/grupos.interface';
import { endpoints } from '../utils/endpoints';

@Injectable({
  providedIn: 'root'
})
export class GruposService {
  private readonly http = inject(HttpClient);
  constructor() { }
  obtenerGrupos() {
    return this.http.get<Grupo[]>(endpoints.obtenerGrupos);
    }
}
