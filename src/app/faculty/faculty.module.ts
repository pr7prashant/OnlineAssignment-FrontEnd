import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { facultyRoutingComponents, FacultyRoutingModule } from "app/faculty/faculty-routing.module";
import { AuthGuard } from "app/shared/guards/auth-guard.service";
import { AuthService } from "app/shared/services/auth.service";

@NgModule({
  imports: [
    CommonModule,
    FacultyRoutingModule
  ],
  declarations: [
    facultyRoutingComponents
  ],
  providers: [ AuthGuard, 
  AuthService 
  ]
})
export class FacultyModule { }
