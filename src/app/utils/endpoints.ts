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
}