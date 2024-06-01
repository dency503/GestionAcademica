import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesor } from '../interfaces/profesor.interface';
import { endpoints } from '../utils/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  constructor(private http: HttpClient) { }

  obtenerProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(endpoints.obtenerProfesores);
  }

  obtenerProfesorPorID(idProfesor: number): Observable<Profesor> {
    const url = endpoints.obtenerProfesorPorID( idProfesor);
    return this.http.get<Profesor>(url);
  }

  agregarProfesor(profesor: Profesor): Observable<any> {
    const body = {
      idProfesor: 0,
      nombresProfesor: profesor.nombresProfesor,
      apellidosProfesor: profesor.apellidosProfesor,
      email: profesor.email
    };
    console.log(body);
    return this.http.post<any>(endpoints.agregarProfesor, body);
  }

  eliminarProfesor(idProfesor: number): Observable<any> {
    const url = endpoints.eliminarProfesor(idProfesor);
    return this.http.delete<any>(url);
  }

  actualizarProfesor(idProfesor: number, profesor: Profesor): Observable<any> {
    const body = {
      idProfesor: profesor.idProfesor,
      nombresProfesor: profesor.nombresProfesor,
      apellidosProfesor: profesor.apellidosProfesor,
      email: profesor.email
    };
    const url = endpoints.actualizarProfesor( idProfesor);
    return this.http.put<number>(url, body);
  }
}
