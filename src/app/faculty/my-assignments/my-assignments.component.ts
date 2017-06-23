import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

import { GetAssignmentService } from "app/shared/services/getAssignments.service";
import { AuthService } from "app/shared/services/auth.service";
import { Upload } from "app/shared/services/upload";
import { UploadService } from "app/shared/services/upload.service";
import { DeleteAssignmentService } from "app/shared/services/deleteAssignment.service";

@Component({
  selector: 'app-my-assignments',
  templateUrl: './my-assignments.component.html',
  styleUrls: ['./my-assignments.component.css']
})
export class MyAssignmentsComponent implements OnInit {

  fileName: string;
  assignments: FirebaseListObservable<any>;
  isLoading = true;

  constructor(
    private _getAsnService: GetAssignmentService,
    private _uploadService: UploadService,
    private _db: AngularFireDatabase,
    private _delAsnService: DeleteAssignmentService
  ) { }

  ngOnInit() {
    this.assignments = this._getAsnService.getAssignments(AuthService.uid);
    this.assignments.subscribe(x => this.isLoading=false);
  }

  onDelete(assignment) {
    console.log(assignment);
    this._delAsnService.deleteAssignment(assignment);
  }

}
