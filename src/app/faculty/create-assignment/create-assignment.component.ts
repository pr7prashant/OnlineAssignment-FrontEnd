import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { UploadComponent } from '../../shared/components/upload/upload.component';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent implements OnInit {

  courses: FirebaseListObservable<any>;
  batches: FirebaseListObservable<any>;

  form: FormGroup;

  constructor(
    private _db: AngularFireDatabase,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getCourses();

    this.form = this._fb.group({
      course: ['', Validators.compose([Validators.required])],
      batch: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      dueDate: ['', Validators.compose([Validators.required])]
    })
  }

  getCourses() {
        this.courses = this._db.list('/courses');
  }

  onCourseChange(course) {
    this.batches = this._db.list('/batches/' + course.courseName);
  }

  onCreate() {
    
  }

}
