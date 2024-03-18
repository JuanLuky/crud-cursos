import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoursesComponent, HeaderComponent],
  template: `
    <app-header />
    <router-outlet />
  `,
})
export class AppComponent {
  title = 'crud-angular';
}
