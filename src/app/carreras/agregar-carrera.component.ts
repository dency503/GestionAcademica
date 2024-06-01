import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Location } from '@angular/common';
import { Carrera } from '../interfaces/carrera.interface';

import { parsearErroresAPI } from '../utils/Utilities';
import { CarreraService } from '../services/carreras.service';

@Component({
  selector: 'app-agregar-carrera',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-carrera.component.html',
})
export class AgregarCarreraComponent implements OnInit {
  form: FormGroup;
  formCarrera: Carrera;
  onRouteStart!: Subscription;
  idCarrera!: number;
  private readonly formBuilder = inject(FormBuilder);
  private readonly carreraService = inject(CarreraService);
  private readonly router = inject(Router);
  private readonly activedRoute = inject(ActivatedRoute);
  private readonly location = inject(Location);

  constructor() {
    this.formCarrera = {} as Carrera;
    this.form = this.formBuilder.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.onRouteStart = this.activedRoute.params.subscribe((temp) => {
      this.idCarrera = temp['idCarrera'];
    });
    if (this.idCarrera && this.idCarrera > 0) {
      this.carreraService.obtenerCarreraPorID(this.idCarrera).subscribe({
        next: (temp) => {
          this.formCarrera = temp;
          this.form.controls['codigo'].setValue(this.formCarrera.codigo);
          this.form.controls['nombre'].setValue(this.formCarrera.nombre);
        },
        error: (err) => {
          console.log("Error: ", err);
        }
      });
    }
  }

  onSubmit() {
    this.formCarrera.codigo = this.form.get('codigo')?.value;
    this.formCarrera.nombre = this.form.get('nombre')?.value;

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Guardando registro, espere por favor...'
    });
    Swal.showLoading();

    if (this.idCarrera && this.idCarrera > 0) {
      this.carreraService.actualizarCarrera(this.idCarrera, this.formCarrera).subscribe({
        next: (temp) => {
          Swal.fire("Actualizado", "Registro actualizado con exito", "success");
          this.location.back()
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar carrera',
            text: parsearErroresAPI(err).toString()
          });
        }
      });
    } else {
      this.carreraService.agregarCarrera(this.formCarrera).subscribe({
        next: (temp) => {
          Swal.fire("Registrado", "Registro insertado con éxito", "success");
          this.location.back()
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al insertar carrera',
            text: parsearErroresAPI(err).toString()
          });
        }
      })
    }
  }

  validateField(field: string) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched;
  }
}
