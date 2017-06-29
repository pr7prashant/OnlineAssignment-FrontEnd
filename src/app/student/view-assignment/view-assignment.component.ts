import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";

import { GetAssignmentService } from "app/shared/services/getAssignments.service";
import { AuthService } from "app/shared/services/auth.service";

@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.component.html',
  styleUrls: ['./view-assignment.component.css']
})
export class ViewAssignmentComponent implements OnInit {

  fileKeys = []; // assignment attachments if any
  fileNames = [];
  asnDetailKey: string;
  subscription1;
  subscription2;
  subscription3;
  asnAuthorId;
  asnDueDate;
  dueDateValid = true;
  status;
  basePath: string = '/submissions/' + AuthService.uid + '/';
  isLoading = true;
  currentNav;

  asnFiles: FirebaseObjectObservable<any> // assignment attachments
  assignment: FirebaseObjectObservable<any>; // assignment detail object

  constructor(
    private _routeParams: ActivatedRoute,
    private _getAsnService: GetAssignmentService,
    private _db: AngularFireDatabase,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getRouteParams();
    this.assignment = this._getAsnService.getAssignment(this.asnDetailKey);
    this.getAttachments();
    this.getStatus();
  }

  ngOnDestroy() {
    this.fileKeys = [];
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
  }

  getRouteParams() {
    this.subscription1 = this._routeParams.params.subscribe(params => {
      this.asnDetailKey = params['AsnDetailKey'];
    });
    if (this._routeParams.snapshot.url[0].path == "pending")
      this.currentNav = "pending";
    else
      this.currentNav = "history";
  }

  getAttachments() {
    var today = new Date().toJSON().split('T')[0];
    this.subscription2 = this.assignment.subscribe(asnDetails => {
      this.asnAuthorId = asnDetails.uid;
      this.asnDueDate = asnDetails.dueDate;
      if (asnDetails.fileKey) {
        this.fileKeys.push(asnDetails.fileKey);
        this.fileKeys[0].forEach(asnFileKey => {
          this.asnFiles = this._getAsnService.getAssignmentFiles(asnFileKey, this.asnAuthorId);
          this.subscription3 = this.asnFiles.subscribe(file => this.fileNames.push(file.name));
        });
      }
      if (this.asnDueDate < today)
        this.dueDateValid = false;

      this.isLoading = false;
    });
  }

  downloadAttachment(fileName) {
    var uid = AuthService.uid;
    let storageRef = firebase.storage().ref().child('assignments/' + this.asnAuthorId + '/' + fileName);
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

  getStatus() {
    this._db.object(`/submission-detail/${this.asnDetailKey}/${AuthService.uid}/`).subscribe((obj) => {
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        // object does not exist
        this.status = 'Not Submitted';
      }
      else {
        // object exists.
        this.status = 'Submitted';
      }
    });
  }


}
