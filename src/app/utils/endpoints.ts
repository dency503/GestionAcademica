import { environment } from "../../environments/environment"

export const endpoints ={
    agregarEstudiante: environment.serverURL
    .concat("estudiantes/agregarEstudiante"),
    actualizarEstudiante: environment.serverURL
    .concat("estudiantes/actualizarEstudiante/:idEstudiante"),
   eliminarEstudiante: environment.serverURL
    .concat("estudiantes/eliminarEstudiante/:idEstudiante"),
    obtenerEstudiantePorID: environment.serverURL
    .concat("estudiantes/obtenerEstudiantePorID/"),
    obtenerEstudiantes: environment.serverURL
    .concat("estudiantes/obtenerEstudiantes"),
    agregarMateria: environment.serverURL.concat('materias/agregarMateria'),
    actualizarMateria: (idMateria: number) => environment.serverURL.concat(`materias/actualizarMateria/${idMateria}`),
    eliminarMateria: (idMateria: number) => environment.serverURL.concat(`materias/eliminarMateria/${idMateria}`),
    obtenerMateriaPorID: (idMateria: number) => environment.serverURL.concat(`materias/obtenerMateriaPorID/${idMateria}`),
    obtenerMaterias: environment.serverURL.concat('materias/obtenerMaterias'),
    agregarGrupo: environment.serverURL.concat('grupos/agregarGrupo'),
  actualizarGrupo: (idGrupo: number) => environment.serverURL.concat(`grupos/actualizarGrupo/${idGrupo}`),
  eliminarGrupo: (idGrupo: number) => environment.serverURL.concat(`grupos/eliminarGrupo/${idGrupo}`),
  obtenerGrupoPorID: (idGrupo: number) => environment.serverURL.concat(`grupos/obtenerGrupoPorID/${idGrupo}`),
  obtenerGrupos: environment.serverURL.concat('grupos/obtenerGrupos'),
  agregarProfesor: environment.serverURL.concat('profesores/agregarProfesor'),
  actualizarProfesor: (idProfesor: number) => environment.serverURL.concat(`profesores/actualizarProfesor/${idProfesor}`),
  eliminarProfesor: (idProfesor: number) => environment.serverURL.concat(`profesores/eliminarProfesor/${idProfesor}`),
  obtenerProfesorPorID: (idProfesor: number) => environment.serverURL.concat(`profesores/obtenerProfesorPorID/${idProfesor}`),
  obtenerProfesores: environment.serverURL.concat('profesores/obtenerProfesores'),
  agregarCarrera: environment.serverURL.concat('carreras/agregarCarrera'),
  actualizarCarrera: (idCarrera: number) => environment.serverURL.concat(`carreras/actualizarCarrera/${idCarrera}`),
  eliminarCarrera: (idCarrera: number) => environment.serverURL.concat(`carreras/eliminarCarrera/${idCarrera}`),
  obtenerCarreraPorID: (idCarrera: number) => environment.serverURL.concat(`carreras/obtenerCarreraPorID/${idCarrera}`),
  obtenerCarreras: environment.serverURL.concat('carreras/obtenerCarreras')

}