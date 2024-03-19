import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable, catchError, of } from 'rxjs';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { AsyncPipe } from '@angular/common';
import { ErrorComponent } from '../../shared/error/error.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [ MatTableModule, MatCardModule, MatInputModule, MatFormFieldModule, FormsModule, MatToolbarModule,MatProgressSpinnerModule, AsyncPipe, ErrorComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category', 'language']

  private coursesService = inject(CoursesService);

  constructor( public dialog: MatDialog ) {
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        this.onError('');
        return of([]);
      })
    );
  }

  onError( errorMsg: string) {
    this.dialog.open(ErrorComponent, {
      data: {
        error: errorMsg,
      },
    });
  }
}
