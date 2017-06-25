import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { studentRoutingComponents, StudentRoutingModule } from "app/student/student-routing.module";
import { SharedModule } from "app/shared/shared.module";
import { ViewAssignmentComponent } from './view-assignment/view-assignment.component';

@NgModule({
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule
  ],
  declarations: [
    studentRoutingComponents,
    ViewAssignmentComponent
  ]
})
export class StudentModule { }
