import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent,MatButtonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {

  }

}
