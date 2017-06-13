import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "app/shared/services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private _authServie: AuthService,
        private _router: Router
        ) { }

    canActivate() {
        console.log("in auth-guard service");
        if(this._authServie.isLoggedIn)
            return true;

        this._router.navigate(['']);

        return false;
    }
}