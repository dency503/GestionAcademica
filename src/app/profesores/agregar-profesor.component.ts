import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Location } from '@angular/common';
import { Profesor } from '../interfaces/profesor.interface';

import { parsearErroresAPI } from '../utils/Utilities';
import { ProfesorService } from '../services/profesores.service';

@Component({
  selector: 'app-agregar-profesor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-profesor.component.html',
 
})
export class AgregarProfesorComponent implements OnInit {
  form: FormGroup;
  formProfesor: Profesor;
  onRouteStart!: Subscription;
  idProfesor!: number;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly profesorService: ProfesorService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location
  ) {
    this.formProfesor = {} as Profesor;
    this.form = this.formBuilder.group({
      nombresProfesor: ['', [Validators.required]],
      apellidosProfesor: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.onRouteStart = this.activatedRoute.params.subscribe((params) => {
      this.idProfesor = params['idProfesor'];
    });

    if (this.idProfesor && this.idProfesor > 0) {
      this.profesorService.obtenerProfesorPorID(this.idProfesor).subscribe({
        next: (profesor) => {
          this.formProfesor = profesor;
          this.form.patchValue({
            nombresProfesor: profesor.nombresProfesor,
            apellidosProfesor: profesor.apellidosProfesor,
            email: profesor.email
          });
        },
        error: (err) => {
          console.log("Error: ", err);
        }
      });
    }
  }

  onSubmit() {
    this.formProfesor.nombresProfesor = this.form.get('nombresProfesor')?.value;
    this.formProfesor.apellidosProfesor = this.form.get('apellidosProfesor')?.value;
    this.formProfesor.email = this.form.get('email')?.value;

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Guardando registro, espere por favor...'
    });
    Swal.showLoading();

    if (this.idProfesor && this.idProfesor > 0) {
      this.profesorService.actualizarProfesor(this.idProfesor, this.formProfesor).subscribe({
        next: () => {
          Swal.fire("Actualizado", "Registro actualizado con éxito", "success");
          this.location.back();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar profesor',
            text: parsearErroresAPI(err).toString()
          });
        }
      });
    } else {
      this.profesorService.agregarProfesor(this.formProfesor).subscribe({
        next: () => {
          Swal.fire("Registrado", "Registro insertado con éxito", "success");
          this.location.back();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al insertar profesor',
            text: parsearErroresAPI(err).toString()
          });
        }
      });
    }
  }

  validateField(field: string) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched;
  }
}
