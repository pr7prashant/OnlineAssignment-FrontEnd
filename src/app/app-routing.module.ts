import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "app/shared/components/home/home.component";

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: '**', component: HomeComponent }
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
export const routingComponents = [HomeComponent]
