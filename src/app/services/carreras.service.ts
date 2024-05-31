import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Carrera } from '../interfaces/carrera.interface';
import { endpoints } from '../utils/endpoints';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  private readonly http = inject(HttpClient);
  constructor() { }
  obtenerCarerras() {
  return this.http.get<Carrera[]>(endpoints.obtenerCarreras);
  }
}
