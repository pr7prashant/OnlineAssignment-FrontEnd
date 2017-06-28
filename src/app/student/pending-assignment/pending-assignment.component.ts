import { Component, OnInit, OnDestroy, Renderer, ElementRef } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { GetAssignmentService } from "app/shared/services/getAssignments.service";
import { AuthService } from "app/shared/services/auth.service";
import { Assignment } from "app/faculty/create-assignment/assignment";

@Component({
  selector: 'app-pending-assignment',
  templateUrl: './pending-assignment.component.html',
  styleUrls: ['./pending-assignment.component.css']
})
export class PendingAssignmentComponent implements OnInit, OnDestroy {

  isLoading = true;
  subscription1;
  subscription2;
  today;
  asnDetailKey;
  arr = [];

  assignments: FirebaseListObservable<any> // List of pending assignments
  submission: FirebaseListObservable<any>

  constructor(
    private _db: AngularFireDatabase,
    private _getAsnService: GetAssignmentService,
    private elRef: ElementRef,
    private renderer: Renderer
  ) { }

  ngOnInit() {
    this.assignments = this._getAsnService.getAsnByCourseBatch(AuthService.courseBatch);
    this.subscription1 = this.assignments.subscribe(() => this.isLoading = false);
  }


  ngOnDestroy() {
    this.subscription1.unsubscribe();
    // this.subscription2.unsubscribe();
  }

  filter(assignment: Assignment): boolean {
    this.today = new Date().toJSON().split('T')[0];
    if (assignment.dueDate >= this.today)
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
