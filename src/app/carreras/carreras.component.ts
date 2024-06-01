import { Component, OnInit, inject } from '@angular/core';

import { Carrera } from '../interfaces/carrera.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { parsearErroresAPI } from '../utils/Utilities';
import { CarreraService } from '../services/carreras.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carreras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.scss']
})
export class CarrerasComponent implements OnInit {
  // Inyección de dependencias
  private readonly carrerasService = inject(CarreraService);
  private readonly router = inject(Router);
  // Arreglo para almacenar el listado de carreras
  lstCarreras: Carrera[];

  constructor() {
    // Es necesario inicializar el arreglo anteriormente creado
    this.lstCarreras = []; 
  }

  ngOnInit(): void {
    this.getAllCarreras();
  }

  // Obtener lista de carreras
  getAllCarreras(){
    this.carrerasService.obtenerCarreras().subscribe({
      // Se evalúa que la respuesta del endpoint sea exitosa
      next: (temp) => {
        // Se asigna la lista al arreglo anteriormente descrito
        this.lstCarreras = temp;
      },
      // En caso de error
      error: (err) => {
        console.log("No se pudo obtener información de las carreras");
      }
    });
  }

  // Método que permite navegar al formulario para insertar carreras
  navigateToForm(){
    this.router.navigate(['/agregarCarrera']);
  }

  // Eliminar una carrera
  deleteCarrera(event: any){
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
        this.carrerasService.eliminarCarrera(event.target.value).subscribe(
          {
            // En caso exitoso
            next: (temp) => {
              Swal.fire("Eliminado","Registro eliminado con éxito","success");
              // Refrescamos la lista de carreras
              this.getAllCarreras();
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

  // Método para navegar a la página de edición de una carrera
  updateCarrera(idCarrera: number){
    // Viajando al componente agregar carrera
    // Primero se valida que exista un valor (es decir que sea distinto de nulo)
    if(idCarrera){
      // Se redirige a la página de edición de carrera con el ID correspondiente
      this.router.navigate(['/editarCarrera', idCarrera]);
    }
  }
}
