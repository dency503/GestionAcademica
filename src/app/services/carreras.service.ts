import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { endpoints } from '../utils/endpoints';
import { Carrera } from '../interfaces/carrera.interface';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  private readonly http = inject(HttpClient);

  constructor() { }

  obtenerCarreras() {
    return this.http.get<Carrera[]>(endpoints.obtenerCarreras);
  }
  
  obtenerCarreraPorID(idCarrera: number) {
    return this.http.get<Carrera>(endpoints.obtenerCarreraPorID( idCarrera));
  }
  
  agregarCarrera(carrera: Carrera) {
    const body = {
      idCarrera: 0,
      codigo: carrera.codigo,
      nombre: carrera.nombre
    };
    return this.http.post<any>(endpoints.agregarCarrera, body);
  }

  eliminarCarrera(idCarrera: number) {
    return this.http.delete<any>(endpoints.eliminarCarrera(idCarrera));
  }

  actualizarCarrera(idCarrera: number, carrera: Carrera) {
    const body = {
      idCarrera: carrera.idCarrera,
      codigo: carrera.codigo,
      nombre: carrera.nombre
    };
    return this.http.put<number>(endpoints.actualizarCarrera(idCarrera), body);
  }
}
