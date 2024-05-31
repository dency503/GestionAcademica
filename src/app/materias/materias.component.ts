import { Component, OnInit, inject } from '@angular/core';
import { Materia } from '../interfaces/materia.interface';
import { MateriasService } from '../services/materias.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.scss'
})

export class MateriasComponent  {
  private readonly materiasService = inject(MateriasService);
  public lstMaterias: Materia[];
  constructor(){
  this.lstMaterias = [];
  this.getAllMaterias();}

  getAllMaterias(): void {
    this.materiasService.obtenerMaterias().subscribe({
      next: (materias) => {
        this.lstMaterias = materias;
      },
      error: (error) => {
        console.error('Error fetching materias:', error);
      }
    });
  }
}