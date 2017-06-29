import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { GetAssignmentService } from "app/shared/services/getAssignments.service";
import { Assignment } from "app/faculty/create-assignment/assignment";
import { AuthService } from "app/shared/services/auth.service";

@Component({
  selector: 'app-previous-assignments',
  templateUrl: './previous-assignments.component.html',
  styleUrls: ['./previous-assignments.component.css']
})
export class PreviousAssignmentsComponent implements OnInit, OnDestroy {

  isLoading = true;
  today;
  subscription1;

  assignments: FirebaseListObservable<any> // List of pending assignments

  constructor(
    private _db: AngularFireDatabase,
    private _getAsnService: GetAssignmentService,
  ) { }

  ngOnInit() {
    this.assignments = this._getAsnService.getAsnByCourseBatch(AuthService.courseBatch);
    this.subscription1 = this.assignments.subscribe(() => this.isLoading = false);
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }

  filter(assignment: Assignment): boolean {
    this.today = new Date().toJSON().split('T')[0];
    if (assignment.dueDate < this.today)
      return false;

    return true;
  }

  getStatus(asnDetailKey) {
    var status;
    this._db.object(`/submission-detail/${asnDetailKey}/${AuthService.uid}/`).subscribe((obj) => {
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        // object does not exist
        status = 'glyphicon-remove';
      }
      else {
        // object exists.
        status = 'glyphicon-ok';
      }
    });
    return status;
  }

}
