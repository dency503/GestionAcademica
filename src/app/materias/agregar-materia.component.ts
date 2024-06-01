import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Materia } from '../interfaces/materia.interface';
import { MateriaService } from '../services/materias.service';
import { parsearErroresAPI } from '../utils/Utilities';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-materia',standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-materia.component.html',
})
export class AgregarMateriaComponent implements OnInit {
  form: FormGroup;
  formMateria: Materia;
  onRouteStart!: Subscription;
  idMateria!: number;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly materiaService: MateriaService,
    private readonly location: Location,
    private readonly activatedRoute: ActivatedRoute,
    
  ) {
    this.formMateria = {} as Materia;
    this.form = this.formBuilder.group({
      nombreMateria: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.onRouteStart = this.activatedRoute.params.subscribe((temp) => {
      this.idMateria = temp['idMateria'];
    });

    if (this.idMateria && this.idMateria > 0) {
      this.materiaService.obtenerMateriaPorID(this.idMateria).subscribe({
        next: (temp) => {
          this.formMateria = temp;
          this.form.controls['nombreMateria'].setValue(this.formMateria.nombreMateria);
        },
        error: (err) => {
          console.log('Error: ', err);
        },
      });
    }
  }

  onSubmit() {
    this.formMateria.nombreMateria = this.form.get('nombreMateria')?.value;

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Guardando registro, espere por favor...',
    });
    Swal.showLoading();

    if (this.idMateria && this.idMateria > 0) {
      this.materiaService.actualizarMateria(this.idMateria, this.formMateria).subscribe({
        next: (temp) => {
          Swal.fire('Actualizado', 'Registro actualizado con éxito', 'success');
          this.location.back();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar materia',
            text: parsearErroresAPI(err).toString(),
          });
        },
      });
    } else {
      this.materiaService.agregarMateria(this.formMateria).subscribe({
        next: (temp) => {
          Swal.fire('Registrado', 'Registro insertado con éxito', 'success');
          this.location.back();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al insertar materia',
            text: parsearErroresAPI(err).toString(),
          });
        },
      });
    }
  }

  validateField(field: string) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched;
  }
}
