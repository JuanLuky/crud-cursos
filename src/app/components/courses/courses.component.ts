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
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { List } from '../../model/select';
import { ThemePalette } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';

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
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  // toggle
  color: ThemePalette = 'accent';
  toggleStates: Map<number, boolean> = new Map();


  // TODAS GET LINHAS
  lojas$?: Observable<Course[]>;

  lojas18_30$?: Observable<Course[]>;
  lojas20_00$?: Observable<Course[]>;
  lojas21_00$?: Observable<Course[]>;
  lojas22_00$?: Observable<Course[]>;
  lojas23_45$?: Observable<Course[]>;
  notOpened$?: Observable<Course[]>;

  displayedColumns = ['name', 'category', 'actions'];
  lists: List[] = [];

  private coursesService = inject(CoursesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.refresh();
  }

  refresh() {
    this.lists = this.coursesService.getLists();
    const values = this.lists.map(list => list.value);
    // TODAS GET LINHAS
    this.lojas$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar os lojas.');
        return of([]);
      })
    );

    this.lojas18_30$ = this.coursesService.getProdutosPorCategoria(values[0]).pipe(
      catchError((error) => {
        this.onError('Erro ao carregar os lojas.');
        return of([]);
      })
    );
    this.lojas20_00$ = this.coursesService.getProdutosPorCategoria(values[1]).pipe(
      catchError((error) => {
        this.onError('Erro ao carregar os lojas.');
        return of([]);
      })
    );
    this.lojas21_00$ = this.coursesService.getProdutosPorCategoria(values[2]).pipe(
      catchError((error) => {
        this.onError('Erro ao carregar os lojas.');
        return of([]);
      })
    );
    this.lojas22_00$ = this.coursesService.getProdutosPorCategoria(values[3]).pipe(
      catchError((error) => {
        this.onError('Erro ao carregar os lojas.');
        return of([]);
      })
    );
    this.lojas23_45$ = this.coursesService.getProdutosPorCategoria(values[4]).pipe(
      catchError((error) => {
        this.onError('Erro ao carregar os lojas.');
        return of([]);
      })
    );
    this.notOpened$ = this.coursesService.getProdutosPorCategoria(values[5]).pipe(
      catchError((error) => {
        this.onError('Erro ao carregar os lojas.');
        return of([]);
      })
    );

  }
  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onCopy(course: Course, courseId: number ) {
    // Toggle
    const currentState = this.toggleStates.get(courseId) || false;
    this.toggleStates.set(courseId, !currentState);


    const courseText = `${course.name}`;
    navigator.clipboard.writeText(courseText).then(() => {
      console.log('Informações do curso copiadas para a área de transferência!');
    }).catch(err => {
      console.error('Erro ao copiar para a área de transferência: ', err);
    });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route });
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


  isToggleChecked(courseId: number): boolean {
    return this.toggleStates.get(courseId) || false;
  }
}


