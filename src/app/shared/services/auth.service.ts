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
    fname;
    lname;
    rno;
    static uid;
    static courseBatch;
    subscription;
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
        this.subscription =  subscription.subscribe(
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
                    if (users[0].type == "faculty") {
                        AuthService.uid = users[0].$key;
                        this.fname = users[0].fname;
                        this.lname = users[0].lname;
                        this._router.navigate(["/faculty"]);
                    }
                    if (users[0].type == "student") {
                        AuthService.uid = users[0].$key;
                        AuthService.courseBatch = users[0].courseBatch;
                        this.fname = users[0].fname;
                        this.lname = users[0].lname;
                        this.rno = users[0].rno;
                        this._router.navigate(["/student"]);
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
        this._router.navigate(['']);
        this.loginError = "";
        this.isLoggedIn = false;
        this.afAuth.auth.signOut();
        this.subscription.unsubscribe();
    }

}