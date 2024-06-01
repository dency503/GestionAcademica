import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

import { GruposService } from '../services/grupos.service';
import { parsearErroresAPI } from '../utils/Utilities';
import { Grupo } from '../interfaces/grupos.interface';

@Component({
  selector: 'app-agregar-grupo', standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-grupo.component.html'
})
export class AgregarGrupoComponent implements OnInit {
  form: FormGroup;
  formGrupo: Grupo;
  onRouteStart!: Subscription;
  idGrupo!: number;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly grupoService: GruposService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location
  ) {
    this.formGrupo = {} as Grupo;
    this.form = this.formBuilder.group({
      idCarrera: ['', [Validators.required]],
      idMateria: ['', [Validators.required]],
      idProfesor: ['', [Validators.required]],
      ciclo: ['', [Validators.required]],
      anio: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.onRouteStart = this.activatedRoute.params.subscribe((params) => {
      this.idGrupo = params['idGrupo'];
    });

    if (this.idGrupo && this.idGrupo > 0) {
      this.grupoService.obtenerGrupoPorID(this.idGrupo).subscribe({
        next: (grupo) => {
          this.formGrupo = grupo;
          this.form.patchValue({
            idCarrera: this.formGrupo.idCarrera,
            idMateria: this.formGrupo.idMateria,
            idProfesor: this.formGrupo.idProfesor,
            ciclo: this.formGrupo.ciclo,
            anio: this.formGrupo.anio
          });
        },
        error: (err) => {
          console.log('Error: ', err);
        }
      });
    }
  }

  onSubmit() {
    this.formGrupo.idCarrera = this.form.get('idCarrera')?.value;
    this.formGrupo.idMateria = this.form.get('idMateria')?.value;
    this.formGrupo.idProfesor = this.form.get('idProfesor')?.value;
    this.formGrupo.ciclo = this.form.get('ciclo')?.value;
    this.formGrupo.anio = this.form.get('anio')?.value;

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Guardando registro, espere por favor...'
    });
    Swal.showLoading();

    if (this.idGrupo && this.idGrupo > 0) {
      this.grupoService.actualizarGrupo(this.idGrupo, this.formGrupo).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'Registro actualizado con éxito', 'success');
          this.location.back();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar grupo',
            text: parsearErroresAPI(err).toString()
          });
        }
      });
    } else {
      this.grupoService.agregarGrupo(this.formGrupo).subscribe({
        next: () => {
          Swal.fire('Registrado', 'Registro insertado con éxito', 'success');
          this.location.back();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al insertar grupo',
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
