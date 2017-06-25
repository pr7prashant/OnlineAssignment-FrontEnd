import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "app/shared/components/home/home.component";
import { NotFoundComponent } from "app/shared/components/not-found/not-found.component";

export const routes: Routes = [
    { path: '', component: HomeComponent },
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
