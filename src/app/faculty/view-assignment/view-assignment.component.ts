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
  subscription1;
  subscription2;
  subscription3;

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
  ) { }

  ngOnInit() {
    this.getRouteParams();
    this.assignment = this._getAsnService.getAssignment(this.asnDetailKey);
    this.getAttachments();
    this.getSubList();
  }

  ngOnDestroy() {
    this.fileKeys = [];
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
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
    storageRef.getDownloadURL().then(url => {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function (event) {
        var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
      window.open(url);
    });
  }

  downloadSubmission(submission) {
    let storageRef = firebase.storage().ref().child('submissions/' + submission.studId + '/' + submission.fileName);
    storageRef.getDownloadURL().then(url => {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function (event) {
        var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
      window.open(url);
    });
  }

  delete() {
    var asn = new Assignment();
    this.assignment.subscribe(asmt => {
      asn.$key = asmt.$key;
    });
    this._delAsnService.deleteAssignment(asn);
    this._router.navigate(['/faculty/assignments']);
  }

  getSubList() {
    this.subList = this._getSubService.getAllSubmissions(this.asnDetailKey);
  }

}
