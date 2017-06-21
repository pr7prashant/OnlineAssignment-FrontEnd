
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Assignment } from "app/faculty/create-assignment/assignment";
import { AuthService } from "app/shared/services/auth.service";
import { AngularFireDatabase } from "angularfire2/database";
import { Router } from "@angular/router";
import { UploadService } from "app/shared/services/upload.service";

@Injectable()
export class EditAssignmentService {

    private _assignment: Assignment;
    private _uploadService: UploadService;
    private basePath: string = '/assignments-detail/';
    edited = false;

    constructor(
        private _db: AngularFireDatabase,
        private _router: Router
    ) { }

    editAssignment(form: FormGroup, keys: any[] = [], asnDetailKey) {
        this._assignment = new Assignment();
        this._assignment.course = form.controls['course'].value;
        this._assignment.batch = form.controls['batch'].value;
        this._assignment.subject = form.controls['subject'].value;
        this._assignment.AsnName = form.controls['name'].value;
        this._assignment.AsnDesc = form.controls['description'].value;
        this._assignment.dueDate = form.controls['dueDate'].value;
        this._assignment.uid = AuthService.uid;

        var asn = this._db.object(`${this.basePath}/` + asnDetailKey);
        asn.subscribe(asnObj => {
            if (asnObj.fileKey) {
                this._assignment.fileKey = asnObj.fileKey;
                this._assignment.fileKey = this._assignment.fileKey.concat(keys);
            }
            else
                this._assignment.fileKey = keys;
            this.edited = true;
        },
            error => this.edited = false
        );

        var unique = this._assignment.fileKey.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
        });
        this._assignment.fileKey = unique;
        asn.update(this._assignment);
        return this.edited;
    }

}