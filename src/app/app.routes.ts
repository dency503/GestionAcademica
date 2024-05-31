import { Routes } from '@angular/router';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { MateriasComponent } from './materias/materias.component';
import { GruposComponent } from './grupos/grupos.component';

export const routes: Routes = [
  { path: 'estudiantes', component: EstudiantesComponent },
  { path: 'profesores', component: ProfesoresComponent },
  { path: 'carreras', component: CarrerasComponent },
  { path: 'materias', component: MateriasComponent },
  { path: 'grupos', component: GruposComponent },
  { path: '', redirectTo: '/estudiantes', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/estudiantes', pathMatch: 'full' } // Redirect to default route for unknown paths
];
