import { Component, EventEmitter, inject, Output } from '@angular/core';

import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from '../../model/select';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
})
export class FormsComponent {

  lists: List[] = [
    { value: 'Front-end', viewValue: 'Front-end' },
    { value: 'Back-end', viewValue: 'Back-end' },
    { value: 'DevOps', viewValue: 'DevOps' },
    { value: 'Inteligência Artificial', viewValue: 'Inteligência Artificial' },
  ];
  languages: List[] = [
    { value: 'TypeScript', viewValue: 'TypeScript' },
    { value: 'Java', viewValue: 'Java' },
    { value: 'JavaScript', viewValue: 'JavaScript' },
    { value: 'Python', viewValue: 'Python' },
    { value: 'Ruby', viewValue: 'Ruby' },
    { value: 'C++', viewValue: 'C++' },
    { value: 'C#', viewValue: 'C#' },
    { value: 'SQL', viewValue: 'SQL' },
    { value: 'Infraestrutura', viewValue: 'Infraestrutura' },
    { value: 'IA', viewValue: 'IA' },
  ];

  private formBuilder = inject(NonNullableFormBuilder);

  form = this.formBuilder.group({
    _id: [''],
    name: [''],
    category: [''],
    language: [''],
  });

  constructor(private snackBar: MatSnackBar) {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category,
      language: course.language,
    });
  }

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private service = inject(CoursesService);

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (result) => this.onSuccess(),
      (error) => this.onError()
    );
  }

  onCancel() {
    this.router.navigate(['courses'], { relativeTo: this.route });
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso', '', { duration: 3000 });
    this.onCancel();
  }
  private onError() {
    this.snackBar.open('Erro ao salvar curso!', '', { duration: 3000 });
  }
}
