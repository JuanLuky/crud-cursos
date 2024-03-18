import { Injectable, inject } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private http = inject(HttpClient);
  private readonly URL_API = '../../assets/courses.json';

  constructor() { }

  list() {
    return this.http.get<Course[]>(this.URL_API)
    .pipe(
      first(),
      delay(2000),
      tap( courses => console.log(courses))
    );
  }
}
