
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Assignment } from "app/faculty/create-assignment/assignment";
import { AuthService } from "app/shared/services/auth.service";
import { AngularFireDatabase } from "angularfire2/database";
import { Router } from "@angular/router";
import { UploadService } from "app/shared/services/upload.service";

@Injectable()
export class CreateAssignmentService {

    private _assignment: Assignment;
    private _uploadService: UploadService;
    private basePath: string = '/assignments-detail/';

    constructor(
        private _authService: AuthService,
        private _db: AngularFireDatabase,
        private _router: Router
        ) { }

    createAssignment(form: FormGroup, keys: any[] = []) {
        this._assignment = new Assignment();

        this._assignment.course = form.controls['course'].value;
        this._assignment.batch = form.controls['batch'].value;
        this._assignment.subject = form.controls['subject'].value;
        this._assignment.AsnName = form.controls['name'].value;
        this._assignment.AsnDesc = form.controls['description'].value;
        this._assignment.dueDate = form.controls['dueDate'].value;
        this._assignment.uid = this._authService.uid;
        this._assignment.fileKey = keys;
        this._assignment.createdAt = new Date();

        var asnDetailKey = this._db.list(`${this.basePath}/`).push(this._assignment);
        console.log("asnDetailKey : " + asnDetailKey.key);
        form.reset();
        return asnDetailKey.key;
    }

}