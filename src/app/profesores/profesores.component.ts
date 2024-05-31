import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Estudiante } from '../interfaces/estudiante.interface';
import { Profesor } from '../interfaces/profesor.interface';
import { ProfesoresService } from '../services/profesores.service';
@Component({
selector: 'app-profesores',
standalone: true,
imports: [CommonModule],
templateUrl: './profesores.component.html',
styleUrl: './profesores.component.scss'
})
export class ProfesoresComponent {
// Haciendo inyeccion de dependencia
private readonly profesoresService = inject(ProfesoresService);
public lstProfesores: Profesor[];
constructor(){
this.lstProfesores = [];
this.getAllProfesores();
}
getAllProfesores(){
this.profesoresService.obtenerProfesores().subscribe({
// Se evalua que la respuesta del endpoint sea exitosa
next: (temp) => {
// Se asigna la lista al arreglo anteriormente descrito
this.lstProfesores = temp;
},
// En caso de error
error: (err) => {
console.log("No se pudo obtener informacion");
}
})
}
}
