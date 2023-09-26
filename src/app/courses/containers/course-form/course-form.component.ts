import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id:[''],
    name: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    category: ['',[Validators.required]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {
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

  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName);

    if (field?.hasError('required')){
      return 'Campo obrigatório';
    }

    return 'Campo Inválido';
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    })
    console.log(course);
  }
}
