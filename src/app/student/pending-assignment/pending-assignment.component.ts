import { Component, OnInit, OnDestroy } from '@angular/core';
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
  subscription;
  today;

  assignments: FirebaseListObservable<any> // List of pending assignments

  constructor(
    private _db: AngularFireDatabase,
    private _getAsnService: GetAssignmentService
  ) { }

  ngOnInit() {
    this.assignments = this._getAsnService.getAsnByCourseBatch(AuthService.courseBatch);
    this.subscription = this.assignments.subscribe(() => this.isLoading=false);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(assignment: Assignment): boolean {
    this.today = new Date().toJSON().split('T')[0];
    if (assignment.dueDate >= this.today)
      return false;

    return true;
  }

}
