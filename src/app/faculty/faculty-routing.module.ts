import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FacultyHomeComponent } from "app/faculty/faculty-home/faculty-home.component";
import { AuthGuard } from "app/shared/guards/auth-guard.service";

export const facultyRoutes: Routes = [
    {
        path: 'faculty/home',
        component: FacultyHomeComponent,
        canActivate: [ AuthGuard ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(facultyRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class FacultyRoutingModule { }
export const facultyRoutingComponents = [FacultyHomeComponent]
