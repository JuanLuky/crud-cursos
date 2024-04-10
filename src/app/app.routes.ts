import { Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { FormsComponent } from './components/forms/forms.component';
import { courseResolver } from './guards/course.resolver';

export const routes: Routes = [
  { path: '', component: CoursesComponent},
  { path: 'courses', component: CoursesComponent},
  { path: 'courses/new', component: FormsComponent, resolve: { course: courseResolver } },
  { path: 'courses/edit/:id', component: FormsComponent,resolve: { course: courseResolver } },

  { path: '**', pathMatch: 'full', redirectTo: '/courses'},

  {
    path: 'courses',
    loadChildren: () =>
      import('./components/courses/courses.component').then(c => c.CoursesComponent)
  },
];
