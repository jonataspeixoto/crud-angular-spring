import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit{

  @Input() courses: Course[] = [];
  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor (
    private router: Router,
    private route: ActivatedRoute){
  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }
  onEdit(){
    //this.router.navigate(['new'], {relativeTo: this.route})
    console.log('onEdit');
  }
  onDelete(){
    //this.router.navigate(['new'], {relativeTo: this.route})
    console.log('onDelete');
  }

  ngOnInit(): void {
  }

}
