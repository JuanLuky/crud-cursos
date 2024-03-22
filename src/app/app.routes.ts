import { Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { FormsComponent } from './components/forms/forms.component';

export const routes: Routes = [
  { path: '', component: CoursesComponent},
  { path: 'courses', component: CoursesComponent},
  { path: 'courses/new', component: FormsComponent},

  { path: '**', pathMatch: 'full', redirectTo: '/courses'},

  {
    path: 'courses',
    loadChildren: () =>
      import('./components/courses/courses.component').then(c => c.CoursesComponent)
  },
];
