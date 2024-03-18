import { Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses'},
  { path: 'courses', component: CoursesComponent},


  {
    path: 'courses',
    loadChildren: () =>
      import('./components/courses/courses.component').then(c => c.CoursesComponent)
  }
];
