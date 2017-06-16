import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FacultyHomeComponent } from "app/faculty/faculty-home/faculty-home.component";
import { AuthGuard } from "app/shared/guards/auth-guard.service";
import { CreateAssignmentComponent } from "app/faculty/create-assignment/create-assignment.component";
import { MyAssignmentsComponent } from "app/faculty/my-assignments/my-assignments.component";

export const facultyRoutes: Routes = [
    {
        path: 'faculty',
        component: FacultyHomeComponent,
        canActivate: [ AuthGuard ],
        children: [
            {
                path: '',
                component: CreateAssignmentComponent
            },
            {
                path: 'assignments/create',
                component: CreateAssignmentComponent
            },
            {
                path: 'assignments',
                component: MyAssignmentsComponent
            }
        ]
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
export const facultyRoutingComponents = [FacultyHomeComponent, CreateAssignmentComponent, MyAssignmentsComponent]
