import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireModule } from "angularfire2";
import * as firebase from 'firebase';
import { AuthService } from "app/shared/services/auth.service";

@Injectable()
export class GetSubmissionService {
    constructor(
        private _af: AngularFireModule,
        private _db: AngularFireDatabase,
        private _authService: AuthService
    ) { }

    getAllSubmissions(asnDetailKey) {
        return this._db.list('/all-submission/', {
            query: {
                orderByChild: 'asnDetailKey',
                equalTo: asnDetailKey
            }
        });
    }

}
