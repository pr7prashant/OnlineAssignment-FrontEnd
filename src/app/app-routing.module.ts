import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "app/shared/components/home/home.component";
import { NotFoundComponent } from "app/shared/components/not-found/not-found.component";
import { ChangePasswordComponent } from "app/shared/components/change-password/change-password.component";

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'changePassword', component: ChangePasswordComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
export const routingComponents = [ ]
