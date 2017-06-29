import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { studentRoutingComponents, StudentRoutingModule } from "app/student/student-routing.module";
import { SharedModule } from "app/shared/shared.module";
import { ViewAssignmentComponent } from './view-assignment/view-assignment.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PreviousAssignmentsComponent } from './previous-assignments/previous-assignments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StudentRoutingModule,
    SharedModule
  ],
  declarations: [
    studentRoutingComponents,
    ViewAssignmentComponent,
    PreviousAssignmentsComponent
  ]
})
export class StudentModule { }
