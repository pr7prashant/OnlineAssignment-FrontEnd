import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { facultyRoutingComponents, FacultyRoutingModule } from "app/faculty/faculty-routing.module";
import { AuthGuard } from "app/shared/guards/auth-guard.service";
import { AuthService } from "app/shared/services/auth.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { UploadComponent } from '../shared/components/upload/upload.component';
import { UploadService } from "app/shared/services/upload.service";

@NgModule({
  imports: [
    CommonModule,
    FacultyRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    facultyRoutingComponents,
    UploadComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    UploadService
  ]
})
export class FacultyModule { }
