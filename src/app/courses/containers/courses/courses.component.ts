import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]> | null= null;

  displayedColumns = ['name', 'category', 'actions'];

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {}

  refresh(){
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar cursos.')
        return of([]);
      })
    );
  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  onEdit(course: Course){
    this.router.navigate(['edit', course._id], {relativeTo: this.route});
  }

  onDelete(course: Course){
    this.coursesService.remove(course._id).subscribe(
      () => {
        this.refresh();
        this._snackBar.open('Curso removido com sucesso!', '',
        {
          duration: 5 * 1000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      },
      error => { this.onError('Erro ao tentar remover curso.')}
    )
  }
}
