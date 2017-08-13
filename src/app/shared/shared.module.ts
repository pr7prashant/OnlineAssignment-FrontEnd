import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SpinnerComponent } from "app/shared/components/spinner/spinner.component";
import { HomeComponent } from "app/shared/components/home/home.component";
import { NavbarComponent } from "app/shared/components/navbar/navbar.component";
import { FooterComponent } from "app/shared/components/footer/footer.component";
import { NotFoundComponent } from "app/shared/components/not-found/not-found.component";
import { UploadComponent } from "app/shared/components/upload/upload.component";
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        HomeComponent,
        NavbarComponent,
        FooterComponent,
        NotFoundComponent,
        UploadComponent,
        SpinnerComponent,
        ChangePasswordComponent
    ],
    providers: [],
    exports: [
        HomeComponent,
        NavbarComponent,
        FooterComponent,
        UploadComponent,
        SpinnerComponent
    ]
})
export class SharedModule { }
