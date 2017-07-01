import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { GetAssignmentService } from "app/shared/services/getAssignments.service";
import { UploadService } from "app/shared/services/upload.service";
import { DeleteAssignmentService } from "app/shared/services/deleteAssignment.service";
import { AuthService } from "app/shared/services/auth.service";
import { Assignment } from "app/faculty/create-assignment/assignment";

@Component({
  selector: 'app-previous-assignments',
  templateUrl: './previous-assignments.component.html',
  styleUrls: ['./previous-assignments.component.css']
})
export class PreviousAssignmentsComponent implements OnInit {

  fileName: string;
  assignments: FirebaseListObservable<any>;
  isLoading = true;
  subscription;
  today;

  constructor(
    private _getAsnService: GetAssignmentService,
    private _uploadService: UploadService,
    private _db: AngularFireDatabase,
    private _delAsnService: DeleteAssignmentService
  ) { }

  ngOnInit() {
    this.assignments = this._getAsnService.getAssignments(AuthService.uid);
    this.subscription = this.assignments.subscribe(() => this.isLoading=false);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete(assignment) {
    this._delAsnService.deleteAssignment(assignment);
  }

  filter(assignment: Assignment): boolean {
    this.today = new Date().toJSON().split('T')[0];
    if (assignment.dueDate < this.today)
      return false;

    return true;
  }

}
