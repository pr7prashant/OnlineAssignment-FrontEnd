import { Component, OnInit } from '@angular/core';
import { GetAssignmentService } from "app/shared/services/getAssignments.service";
import { AuthService } from "app/shared/services/auth.service";
import { FirebaseListObservable } from "angularfire2/database";

@Component({
  selector: 'app-my-assignments',
  templateUrl: './my-assignments.component.html',
  styleUrls: ['./my-assignments.component.css']
})
export class MyAssignmentsComponent implements OnInit {

  assignments: FirebaseListObservable<any>;

  constructor(private _getAsnService: GetAssignmentService) { }

  ngOnInit() {
    this.assignments = this._getAsnService.getAssignments(AuthService.uid);
  }

}
