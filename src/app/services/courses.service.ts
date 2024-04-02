import { Injectable, inject } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private http = inject(HttpClient);
  private readonly URL_API = `${environment.api}`;

  list() {
    return this.http.get<Course[]>(this.URL_API)
    .pipe(
      first(),
      delay(2000),
    );
  }

  save(record: Course) {
    return this.http.post<Course[]>(this.URL_API, record)
    .pipe(
      first(),
    );
  }
}
