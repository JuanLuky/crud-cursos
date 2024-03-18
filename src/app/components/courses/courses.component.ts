import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [ MatTableModule, MatCardModule, MatInputModule, MatFormFieldModule, FormsModule, MatToolbarModule,MatProgressSpinnerModule, AsyncPipe],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category', 'language']

  private coursesService = inject(CoursesService);

  constructor() {
    this.courses$ = this.coursesService.list();
  }
}
