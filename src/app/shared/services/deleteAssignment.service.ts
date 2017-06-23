
import { Injectable } from "@angular/core";
import { AuthService } from "app/shared/services/auth.service";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class DeleteAssignmentService {

    constructor(private _db: AngularFireDatabase) { }

    deleteAssignment(assignment) {
        if (confirm("Are you sure ? This action will delete assignment permanently. ")) {
            if (assignment.fileKey) {
                assignment.fileKey.forEach(file => this._db.object(`/assignments/${AuthService.uid}/${file}`).remove());
            }
            this._db.object(`/assignments-detail/${assignment.$key}`).remove();
        }
    }

}