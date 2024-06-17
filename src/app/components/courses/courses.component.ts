import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable, catchError, of } from 'rxjs';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { AsyncPipe } from '@angular/common';
import { ErrorComponent } from '../../shared/error/error.component';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    ErrorComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {

  courses$: Observable<Course[]> | null = null;
  courses20$: Observable<Course[]> | null = null;
  displayedColumns = ['name', 'category', 'actions'];

  private coursesService = inject(CoursesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.refresh();
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  onCopy(course: Course) {
    const courseText = `${course.name}`;
    navigator.clipboard.writeText(courseText).then(() => {
      alert('Informações do curso copiadas para a área de transferência!');
    }).catch(err => {
      console.error('Erro ao copiar para a área de transferência: ', err);
    });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route });
  }
  refresh() {
    this.courses20$ = this.coursesService.getProdutosPorCategoria('Eletros 18h:30').pipe(
      catchError((error) => {
        this.onError('');
        return of([]);
      })
    );

    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar os cursos.');
        return of([]);
      })
    );
  }

  onDelete(course: Course) {

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: "Tem certeza que deseja remover esse curso?",
      });

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.coursesService.remove(course._id).subscribe(
            () => {
              this.refresh();
              this.snackBar.open('Curso removido com sucesso', 'X', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });
            },
            () => this.onError('Erro ao tentar deletar o curso')
          );
        }
      })
    }

  onError(errorMsg: string) {
    this.dialog.open(ErrorComponent, {
      data: {
        error: errorMsg,
      },
    });
  }
}


