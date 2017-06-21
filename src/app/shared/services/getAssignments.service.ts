
import { Injectable } from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from "app/shared/services/auth.service";

@Injectable()
export class GetAssignmentService {

    assignments: FirebaseListObservable<any>;
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
    getAssignmentFiles(asnFileKey) {
        var uid = AuthService.uid;
        this.asnFiles = this._db.object('/assignments/' + uid + "/" + asnFileKey);
        return this.asnFiles;
    }

}