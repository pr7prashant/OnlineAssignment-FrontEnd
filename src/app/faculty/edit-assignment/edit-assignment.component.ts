import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";

import { UploadService } from "app/shared/services/upload.service";
import { GetAssignmentService } from "app/shared/services/getAssignments.service";
import { Assignment } from "app/faculty/create-assignment/assignment";
import { EditAssignmentService } from "app/faculty/edit-assignment/edit-assignment.service";


@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {

  courses: FirebaseListObservable<any>;
  batches: FirebaseListObservable<any>;
  assignment: FirebaseObjectObservable<any>; // assignment detail object
  private _assignment: Assignment;
  form: FormGroup;

  today;
  asnDetailKey: string;
  keys: any[] = [];
  edited: boolean;

  constructor(
    private _routeParams: ActivatedRoute,
    private _db: AngularFireDatabase,
    private _fb: FormBuilder,
    private _uploadService: UploadService,
    private _getAsnService: GetAssignmentService,
    private _editAsnSvc: EditAssignmentService,
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.getRouteParams();
    this.assignment = this._getAsnService.getAssignment(this.asnDetailKey);
    this.assignment.subscribe(asnDetails => this.validateForm(asnDetails));
    this.getCourses();
  }

  initForm() {
    this.form = this._fb.group({
      course: ['', Validators.compose([Validators.required])],
      batch: ['', Validators.compose([Validators.required])],
      subject: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      dueDate: ['', Validators.compose([Validators.required])]
    });
  }

  validateForm(asnDetails) {
    this.form = this._fb.group({
      course: [asnDetails.course, Validators.compose([Validators.required])],
      batch: [asnDetails.batch, Validators.compose([Validators.required])],
      subject: [asnDetails.subject, Validators.compose([Validators.required])],
      name: [asnDetails.AsnName, Validators.compose([Validators.required])],
      description: [asnDetails.AsnDesc, Validators.compose([Validators.required])],
      dueDate: [asnDetails.dueDate, Validators.compose([Validators.required])]
    });
    this.today = new Date().toJSON().split('T')[0];
    this.batches = this._db.list('/batches/' + asnDetails.course);
  }

  // Get assignment detail key from route parameter
  getRouteParams() {
    this._routeParams.params.subscribe(params => {
      this.asnDetailKey = params['AsnDetailKey'];
    });
  }

  getCourses() {
    this.courses = this._db.list('/courses');
  }

  onCourseChange(course) {
    this.batches = this._db.list('/batches/' + course.courseName);
  }

  onEdit() {
    this.keys = this._uploadService.keys;
    this.edited = this._editAsnSvc.editAssignment(this.form, this.keys, this.asnDetailKey);
    window.scrollTo(0, 0);
  }


}
