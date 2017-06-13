import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsernameValidators } from "app/shared/validators/usernameValidators";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  user: Observable<firebase.User>;

  constructor(
    private _fb: FormBuilder,
    public afAuth: AngularFireAuth,
    private _router: Router
  ) { }

  ngOnInit() {

    this.form = this._fb.group({
      email: ['', Validators.compose([ Validators.required, Validators.email ])],
      password: ['', Validators.compose([ Validators.required ])]
    })
  }

  onloginClick() {
    this._router.navigate(["/faculty/home"]);
  }


}
