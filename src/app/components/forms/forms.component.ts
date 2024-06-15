import { Component, EventEmitter, inject, Output, signal } from '@angular/core';

import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
    { value: 'Eletros 18h:30', viewValue: 'Eletros 18h:30' },
    { value: 'Caminos e Carone 20h:30', viewValue: 'Caminos e Carone 20h:30' },
    { value: 'Caminos e Carone 21h:00', viewValue: 'Caminos e Carone 21h:00' },
    { value: 'Lojas as 21h:00 / 22h:00', viewValue: 'Lojas as 21h:00 / 22h:00' },
    { value: 'Lojas as 23h:45', viewValue: 'Lojas as 23h:45' },
    { value: 'Não Inauguradas 22h:00', viewValue: 'Não Inauguradas 22h:00' },
  ];

  private formBuilder = inject(NonNullableFormBuilder);

  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    category: ['',[Validators.required]],
  });

  constructor(private snackBar: MatSnackBar) {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category,
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

  errorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5 ;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }
    return 'Campo Inválido';
  }
}
