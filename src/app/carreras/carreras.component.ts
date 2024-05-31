import { Component, inject } from '@angular/core';
import { CarrerasService } from '../services/carreras.service';
import { Carrera } from '../interfaces/carrera.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carreras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carreras.component.html',
  styleUrl: './carreras.component.scss'
})
export class CarrerasComponent {
  private readonly estudiantesService = inject(CarrerasService);
  public lstCarreras: Carrera[];
  constructor(){
  this.lstCarreras = [];
  this.getAllCarreras();
  }
getAllCarreras(){
  this.estudiantesService.obtenerCarerras().subscribe({
  // Se evalua que la respuesta del endpoint sea exitosa
  next: (temp) => {
  // Se asigna la lista al arreglo anteriormente descrito
  this.lstCarreras = temp;
  },
  // En caso de error
  error: (err) => {
  console.log("No se pudo obtener informacion");
  }
  })
  }}