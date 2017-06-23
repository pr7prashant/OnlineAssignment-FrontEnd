import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { facultyRoutingComponents, FacultyRoutingModule } from "app/faculty/faculty-routing.module";
import { AuthGuard } from "app/shared/guards/auth-guard.service";
import { AuthService } from "app/shared/services/auth.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { UploadComponent } from '../shared/components/upload/upload.component';
import { UploadService } from "app/shared/services/upload.service";
import { CreateAssignmentService } from "app/faculty/create-assignment/create-assignment.service";
import { GetAssignmentService } from "app/shared/services/getAssignments.service";
import { EditAssignmentService } from "app/faculty/edit-assignment/edit-assignment.service";
import { SpinnerComponent } from "app/shared/components/spinner/spinner.component";
import { DeleteAssignmentService } from "app/shared/services/deleteAssignment.service";

@NgModule({
  imports: [
    CommonModule,
    FacultyRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    facultyRoutingComponents,
    UploadComponent,
    SpinnerComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    UploadService,
    CreateAssignmentService,
    GetAssignmentService,
    EditAssignmentService,
    DeleteAssignmentService
  ]
})
export class FacultyModule { }
