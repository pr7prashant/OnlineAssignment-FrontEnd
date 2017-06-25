import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { UploadService } from "app/shared/services/upload.service";
import { CreateAssignmentService } from "app/faculty/create-assignment/create-assignment.service";
import { AuthService } from "app/shared/services/auth.service";

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent implements OnInit {

  courses: FirebaseListObservable<any>;
  batches: FirebaseListObservable<any>;
  form: FormGroup;
  keys: any[] = [];
  asnDetailKey = "";
  basePath: string = '/assignments/' + AuthService.uid + '/';
  today;

  constructor(
    private _db: AngularFireDatabase,
    private _fb: FormBuilder,
    private _uploadService: UploadService,
    private _createAsnSvc: CreateAssignmentService
  ) { }

  ngOnInit() {
    this.getCourses();
    this.validate();
  }

  validate() {
    this.form = this._fb.group({
      course: ['', Validators.compose([Validators.required])],
      batch: ['', Validators.compose([Validators.required])],
      subject: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      dueDate: ['', Validators.compose([Validators.required])]
    });

    var date = new Date();
    this.today = new Date().toJSON().split('T')[0];
  }

  getCourses() {
    this.courses = this._db.list('/courses');
  }

  onCourseChange(course) {
    this.batches = this._db.list('/batches/' + course.courseName);
  }

  onCreate() {
    this.keys = this._uploadService.keys;
    this.asnDetailKey = this._createAsnSvc.createAssignment(this.form, this.keys);
    window.scrollTo(0, 0);
    this.validate();
  }

}
