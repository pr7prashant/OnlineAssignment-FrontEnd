import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromPromise';
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
    isLoggedIn = false;
    loginError = "";
    user: Observable<firebase.User>;

    constructor(
        public afAuth: AngularFireAuth,
        private _router: Router
    ) {
        this.user = afAuth.authState;
    }

    login(email: string, password: string) {
        console.log("in auth sevice...");

        // user verification code here
        var subscription = Observable.fromPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password));
        subscription.subscribe(
            res => {
                console.log("logging in...");
                this.isLoggedIn = true;
                this._router.navigate(["/faculty/home"]);
            },
            err => {
                this.loginError = err.code;
                console.log(this.loginError);
            }
        );
    }

    logout() {
        this.isLoggedIn = false;
    }

}