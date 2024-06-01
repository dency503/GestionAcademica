import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../utils/endpoints';
import { Materia } from '../interfaces/materia.interface';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  constructor(private readonly http: HttpClient) { }

  obtenerMaterias() {
    return this.http.get<Materia[]>(endpoints.obtenerMaterias);
  }
  
  obtenerMateriaPorID(idMateria: number) {
    return this.http.get<Materia>(endpoints.obtenerMateriaPorID(idMateria));
  }
  
  agregarMateria(materia: Materia) {
    const body = {
      idMateria: 0,
      nombreMateria: materia.nombreMateria
    };
    return this.http.post<any>(endpoints.agregarMateria, body);
  }
  
  eliminarMateria(idMateria: number) {
    return this.http.delete<any>(endpoints.eliminarMateria( idMateria));
  }
  
  actualizarMateria(idMateria: number, materia: Materia) {
    const body = {
      idMateria: materia.idMateria,
      nombreMateria: materia.nombreMateria
    };
    return this.http.put<number>(endpoints.actualizarMateria( idMateria), body);
  }
}
