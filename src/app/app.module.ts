import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import * as firebase from 'firebase';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from "app/app-routing.module";

import { FacultyModule } from "app/faculty/faculty.module";
import { StudentModule } from "app/student/student.module";

import { AuthGuard } from "app/shared/guards/auth-guard.service";
import { SharedModule } from "app/shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    SharedModule,
    FacultyModule,
    StudentModule,
    AppRoutingModule,
    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
