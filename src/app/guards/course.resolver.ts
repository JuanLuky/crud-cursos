import { ResolveFn } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { inject } from '@angular/core';
import { Course } from '../model/course';
import { of } from 'rxjs';

export const courseResolver: ResolveFn<Course> = (route, state) => {

  if(route.params && route.params['id']) {
    const courseID = route.paramMap.get('id');
    return inject(CoursesService).loadByID(courseID)
  }
  return of({_id:'', name:'', category:'',language:''});

};
