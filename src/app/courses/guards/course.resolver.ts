import { ResolveFn } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course';
import { inject } from '@angular/core';

export const courseResolver: ResolveFn<Course> = (route, state, service: CoursesService = inject(CoursesService)) => {
  if (route?.params && route?.params?.['id']){
    return service.loadById(route.params['id']);
  }
  return { _id: '', name: '', category: ''};
};
