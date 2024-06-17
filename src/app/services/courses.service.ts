import { Injectable, inject } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, first } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private http = inject(HttpClient);
  private readonly URL_API = `${environment.api}`;
  private readonly URL_API_TEST = `${environment.apitest}`;

  getProdutosPorCategoria(category: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.URL_API_TEST}?category=${category}`).pipe(first(), delay(500));
  }

  list() {
    return this.http.get<Course[]>(this.URL_API).pipe(first(), delay(500));
  }

  loadByID(id: string | null) {
    return this.http.get<Course>(`${this.URL_API}/${id}`);
  }

  save(record: Partial<Course>) {
    if(record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Course>) {
    return this.http.post<Course[]>(this.URL_API, record).pipe(first());
  }
  private update(record: Partial<Course>) {
    return this.http.put<Course[]>(`${this.URL_API}/${record._id}`, record).pipe(first());
  }
  remove(id: string) {
    return this.http.delete(`${this.URL_API}/${id}`).pipe(first());
  }
}
