import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/shared/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router
    ) { }

  ngOnInit() {
  }

  onLogoutClick() {
    console.log("logged out");
    this._authService.isLoggedIn = false;
    this._router.navigate(['']);
  }

}
