import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import * as firebase from 'firebase/app';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromPromise';
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
    isLoggedIn = false;
    loginError = "";
    fname = "";
    user: Observable<firebase.User>;
    faculty: FirebaseListObservable<any[]>;

    constructor(
        public afAuth: AngularFireAuth,
        private _router: Router,
        private _db: AngularFireDatabase
    ) {
        this.user = afAuth.authState;
    }

    login(email: string, password: string) {
        console.log("in auth sevice...");

        // user verification code
        var subscription = Observable.fromPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password));
        subscription.subscribe(
            res => {
                console.log("logging in...");
                this.isLoggedIn = true;
                this.faculty = this._db.list('/users', {
                    query: {
                        orderByChild: 'email',
                        equalTo: email
                    }
                });                                    
                this.faculty.forEach(users => {
                    if(users[0].type == "faculty") {
                        this.fname = users[0].fname;
                        this._router.navigate(["/faculty"]);
                    }                     
                });              
            },
            err => {
                this.loginError = err.code;
                console.log(this.loginError);
            }
        );
    }

    logout() {
        this.isLoggedIn = false;
        this.loginError = "";
        this._router.navigate(['']);
    }

}