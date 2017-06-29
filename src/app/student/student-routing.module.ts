import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "app/shared/guards/auth-guard.service";
import { StudentHomeComponent } from "app/student/student-home/student-home.component";
import { PendingAssignmentComponent } from "app/student/pending-assignment/pending-assignment.component";
import { ViewAssignmentComponent } from "app/student/view-assignment/view-assignment.component";
import { PreviousAssignmentsComponent } from "app/student/previous-assignments/previous-assignments.component";

export const studentRoutes: Routes = [
    {
        path: 'student',
        component: StudentHomeComponent,
        canActivate: [ AuthGuard ],
        children: [
            {
                path: '',
                redirectTo: 'pending',
                pathMatch: 'full'
            },
            {
                path: 'pending',
                component: PendingAssignmentComponent
            },
            {
                path: 'history',
                component: PreviousAssignmentsComponent
            },
            {
                path: 'pending/view/:AsnDetailKey',
                component: ViewAssignmentComponent
            },
            {
                path: 'history/view/:AsnDetailKey',
                component: ViewAssignmentComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(studentRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class StudentRoutingModule { }
export const studentRoutingComponents = [
        StudentHomeComponent,
        PendingAssignmentComponent
    ]
