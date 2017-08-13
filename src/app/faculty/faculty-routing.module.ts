import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FacultyHomeComponent } from "app/faculty/faculty-home/faculty-home.component";
import { AuthGuard } from "app/shared/guards/auth-guard.service";
import { CreateAssignmentComponent } from "app/faculty/create-assignment/create-assignment.component";
import { MyAssignmentsComponent } from "app/faculty/my-assignments/my-assignments.component";
import { ViewAssignmentComponent } from "app/faculty/view-assignment/view-assignment.component";
import { EditAssignmentComponent } from "app/faculty/edit-assignment/edit-assignment.component";
import { PreviousAssignmentsComponent } from "app/faculty/previous-assignments/previous-assignments.component";

export const facultyRoutes: Routes = [
    {
        path: 'faculty',
        component: FacultyHomeComponent,
        canActivate: [ AuthGuard ],
        children: [
            {
                path: '',
                redirectTo: 'assignments/create',
                pathMatch: 'full'
            },
            {
                path: 'assignments/create',
                component: CreateAssignmentComponent
            },
            {
                path: 'assignments',
                component: MyAssignmentsComponent
            },
            {
                path: 'assignments/history',
                component: PreviousAssignmentsComponent
            },
            {
                path: 'assignments/view/:AsnDetailKey',
                component: ViewAssignmentComponent
            },
            {
                path: 'assignments/history/view/:AsnDetailKey',
                component: ViewAssignmentComponent
            },
            {
                path: 'assignments/history/edit/:AsnDetailKey',
                component: EditAssignmentComponent
            },
            {
                path: 'assignments/edit/:AsnDetailKey',
                component: EditAssignmentComponent
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
export const facultyRoutingComponents = [
    FacultyHomeComponent, 
    CreateAssignmentComponent, 
    MyAssignmentsComponent,
    ViewAssignmentComponent,
    EditAssignmentComponent
    ]
