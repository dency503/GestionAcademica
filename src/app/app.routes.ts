import { Routes } from '@angular/router';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
export const routes: Routes = [
{path: '', component: EstudiantesComponent, pathMatch: 'full'}, // Ruta por defecto
{path: '**', redirectTo: '', pathMatch: 'full'} // Rutas no existentes
];
