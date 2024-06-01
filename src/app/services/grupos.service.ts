import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../utils/endpoints';
import { Grupo } from '../interfaces/grupos.interface';


@Injectable({
  providedIn: 'root'
})
export class GruposService {

  constructor(private readonly http: HttpClient) { }

  obtenerGrupos() {
    return this.http.get<Grupo[]>(endpoints.obtenerGrupos);
  }
  
  obtenerGrupoPorID(idGrupo: number) {
    return this.http.get<Grupo>(endpoints.obtenerGrupoPorID( idGrupo));
  }
  
  agregarGrupo(grupo: Grupo) {
    const body = {
      idGrupo: 0,
      idCarrera: grupo.idCarrera,
      idMateria: grupo.idMateria,
      idProfesor: grupo.idProfesor,
      ciclo: grupo.ciclo,
      anio: grupo.anio
    };
    return this.http.post<any>(endpoints.agregarGrupo, body);
  }
  
  eliminarGrupo(idGrupo: number) {
    return this.http.delete<any>(endpoints.eliminarGrupo( idGrupo));
  }
  
  actualizarGrupo(idGrupo: number, grupo: Grupo) {
    const body = {
      idGrupo: grupo.idGrupo,
      idCarrera: grupo.idCarrera,
      idMateria: grupo.idMateria,
      idProfesor: grupo.idProfesor,
      ciclo: grupo.ciclo,
      anio: grupo.anio
    };
    return this.http.put<number>(endpoints.actualizarGrupo( idGrupo), body);
  }
}
