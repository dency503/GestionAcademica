import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Materia } from '../interfaces/materia.interface';
import { endpoints } from '../utils/endpoints';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private readonly http = inject(HttpClient);
  constructor() { }
  obtenerMaterias() {
    return this.http.get<Materia[]>(endpoints.obtenerMaterias);
    }
}
