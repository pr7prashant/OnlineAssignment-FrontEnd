import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { facultyRoutingComponents, FacultyRoutingModule } from "app/faculty/faculty-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FacultyRoutingModule,
  ],
  declarations: [
    facultyRoutingComponents
    ]
})
export class FacultyModule { }
