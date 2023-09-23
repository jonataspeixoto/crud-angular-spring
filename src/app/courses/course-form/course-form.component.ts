import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    name: [''],
    category: [''],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location) {
  }

  onCancel() {
    this.location.back();
  }
  onSubmit() {
    this.service.save(this.form.value).subscribe(result => this.onSuccess(), error => this.onError());
  }
  onError(){
    this._snackBar.open('Erro ao salvar curso', '', { duration: 5 * 1000 });
  }
  onSuccess(){
    this._snackBar.open('Curso salvo com sucesso', '', { duration: 5 * 1000 });
    this.onCancel();
  }

  ngOnInit(): void {}
}
