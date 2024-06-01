import { Component, OnInit, inject } from '@angular/core';
import { GruposService } from '../services/grupos.service';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { parsearErroresAPI } from '../utils/Utilities';
import { Grupo } from '../interfaces/grupos.interface';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.scss'
})
export class GruposComponent implements OnInit {
  // Inyeccion de dependencias
  private readonly gruposService = inject(GruposService);
  private readonly router = inject(Router);
  // Arreglo para almacenar el listado de grupos
  lstGrupos: Grupo[];

  constructor() {
    // Es necesario inicializar el arreglo anteriormente creado
    this.lstGrupos = []; 
  }

  ngOnInit(): void {
    this.getAllGrupos();
  }

  // Obtener lista de grupos
  getAllGrupos(){
    this.gruposService.obtenerGrupos().subscribe({
      // Se evalua que la respuesta del endpoint sea exitosa
      next: (temp) => {
        // Se asigna la lista al arreglo anteriormente descrito
        this.lstGrupos = temp;
      },
      // En caso de error
      error: (err) => {
        console.log("No se pudo obtener información");
      }
    })
  }

  // Método que permite navegar al formulario para insertar grupos
  navigateToForm(){
    this.router.navigate(['/agregarGrupo']);
  }

  // Eliminar un grupo
  deleteGrupo(event: any){
    Swal.fire({
      title: "¿Quiere eliminar este registro?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.isConfirmed){
        this.gruposService.eliminarGrupo(event.target.value).subscribe(
          {
            // En caso exitoso
            next: (temp) => {
              Swal.fire("Eliminado","Registro eliminado con éxito","success");
              // Refrescamos la lista de grupos
              this.getAllGrupos();
            },
            // En caso erróneo
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error al eliminar',
                text: parsearErroresAPI(err).toString()
              });
            }
          });
      }
    });
  }

  updateGrupo(valor: number){
    // Viajando al componente agregar grupo
    // Primero se valida que exista un valor (es decir que sea distinto de nulo)
    if(valor){
      // Como puede notar, ahora se anexa un valor a la redirección. Ej. /agregarGrupo/3
      this.router.navigate(['/agregarGrupo', valor]);
    }
  }
}
