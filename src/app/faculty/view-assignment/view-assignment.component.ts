import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { GetAssignmentService } from "app/shared/services/getAssignments.service";
import { AuthService } from "app/shared/services/auth.service";
import { DeleteAssignmentService } from "app/shared/services/deleteAssignment.service";
import { GetSubmissionService } from "app/shared/services/getSubmissions.service";

import { FirebaseObjectObservable, FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase';

import { Assignment } from "app/faculty/create-assignment/assignment";

@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.component.html',
  styleUrls: ['./view-assignment.component.css']
})
export class ViewAssignmentComponent implements OnInit, OnDestroy {

  fileKeys = []; // assignment attachments if any
  fileNames = [];
  asnDetailKey: string;
  isLoading = true;
  currentNav;
  courseBatch;
  totalStudents;
  studentNames = [];
  defaulterList = [];
  asnDownloadUrls = [];
  subscription1;
  subscription2;
  subscription3;
  subscription4;
  subscription5;
  subscription6;

  batchStrength: FirebaseObjectObservable<any> // total number of students in batch
  studentList: FirebaseListObservable<any> // list of all students of batch
  asnFiles: FirebaseObjectObservable<any> // assignment attachments
  assignment: FirebaseObjectObservable<any>; // assignment detail object
  subList: FirebaseListObservable<any>; // List of all submissions for a particular assignment

  constructor(
    private _routeParams: ActivatedRoute,
    private _getAsnService: GetAssignmentService,
    private _db: AngularFireDatabase,
    private _delAsnService: DeleteAssignmentService,
    private _router: Router,
    private _getSubService: GetSubmissionService
  ) {
    this.getRouteParams();
    this.subList = this._getSubService.getAllSubmissions(this.asnDetailKey);
  }

  ngOnInit() {
    this.assignment = this._getAsnService.getAssignment(this.asnDetailKey);
    this.getAttachments();
  }

  ngOnDestroy() {
    this.fileKeys = [];
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
    this.subscription4.unsubscribe();
    this.subscription5.unsubscribe();
    this.subscription6.unsubscribe();
  }

  // Get assignment detail key from route parameter
  getRouteParams() {
    this.subscription1 = this._routeParams.params.subscribe(params => {
      this.asnDetailKey = params['AsnDetailKey'];
    });
    if (this._routeParams.snapshot.url[1].path == "history")
      this.currentNav = "assignments/history";
    else
      this.currentNav = "assignments";
  }

  getAttachments() {
    this.subscription2 = this.assignment.subscribe(asnDetails => {
      this.courseBatch = asnDetails.courseBatch;
      this.getSubDefaultersList();
      if (asnDetails.fileKey) {
        this.fileKeys.push(asnDetails.fileKey);
        this.fileKeys[0].forEach(asnFileKey => {
          this.asnFiles = this._getAsnService.getAssignmentFiles(asnFileKey, AuthService.uid);
          this.subscription3 = this.asnFiles.subscribe(file => this.fileNames.push(file.name));
        });
      }
      this.isLoading = false;
    });
  }

  downloadAttachment(fileName) {
    var uid = AuthService.uid;
    let storageRef = firebase.storage().ref().child('assignments/' + uid + '/' + fileName);
    storageRef.getDownloadURL().then(url => window.open(url));
  }

  downloadSubmission(submission) {
    let storageRef = firebase.storage().ref().child('submissions/' + submission.studId + '/' + submission.fileName);
    storageRef.getDownloadURL().then(url => window.open(url));
  }

  delete() {
    var asn = new Assignment();
    this.assignment.subscribe(asmt => {
      asn.$key = asmt.$key;
    });
    this._delAsnService.deleteAssignment(asn);
    this._router.navigate(['/faculty/assignments']);
  }

  getSubDefaultersList() {
    // Getting list of all students in batch
     this.studentList = this._db.list('/users/', {
      query: {
        orderByChild: 'courseBatch',
        equalTo: this.courseBatch
      }
    });
    this.subscription4 = this.studentList.subscribe(stud => {
      stud.forEach(element => {
        this.studentNames.push(element.fname + " " + element.lname)
      });
    }); 

    // Getting list of defaulter students
    this.batchStrength = this._db.object(`/batch-strength/${this.courseBatch}`);
    this.subscription5 = this.batchStrength.subscribe(obj => {
      this.totalStudents = obj.$value;
      for (var i = 1; i <= this.totalStudents; i++)
        this.defaulterList[i] = i;
    });
    this.subscription6 = this.subList.subscribe(sub => {
      sub.forEach(element => {
        this.asnDownloadUrls.push(element.url);
        let rnoIndex = this.defaulterList.indexOf(element.studRno);
        if (rnoIndex !== -1) {
          this.defaulterList.splice(rnoIndex, 1);
        }
      });
    });
  }

  downloadAllAsn() {
    this.asnDownloadUrls.forEach(url => window.open(url));
  }

}
