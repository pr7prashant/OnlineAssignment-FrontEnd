
import { Injectable } from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthService } from "app/shared/services/auth.service";
import { Assignment } from "app/faculty/create-assignment/assignment";

@Injectable()
export class GetAssignmentService {

    assignments: FirebaseListObservable<Assignment[]>;
    assignment: FirebaseObjectObservable<any>;
    asnFiles: FirebaseObjectObservable<any>

    constructor(private _db: AngularFireDatabase) { }

    // Retrieve all assignments created by user(uid)
    getAssignments(uid) {
        this.assignments = this._db.list('/assignments-detail', {
            query: {
                orderByChild: 'uid',
                equalTo: uid
            }
        });
        return this.assignments;
    }

    // Retrieve a single assignment by assignment-detail key
    getAssignment(asnDetailKey) {
        var uid = AuthService.uid;
        this.assignment = this._db.object('/assignments-detail/' + asnDetailKey);
        return this.assignment;
    }

    // Get assignment attachment files 
    getAssignmentFiles(asnFileKey, uid) {
        this.asnFiles = this._db.object('/assignments/' + uid + "/" + asnFileKey);
        return this.asnFiles;
    }

    // Get all assignments valid by due date
    getAsnByCourseBatch(courseBatch) {
        this.assignments = this._db.list('/assignments-detail', {
            query: {
                orderByChild: 'courseBatch',
                equalTo: courseBatch
            }
        });
        return this.assignments;
    }

}