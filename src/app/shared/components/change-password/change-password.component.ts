import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as firebase from 'firebase/app';
import { Router } from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;
  msgFlag: boolean = true;
  
  constructor(
    private _fb: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit() {
    this.form = this._fb.group({
      email: ['', Validators.compose([ Validators.required, Validators.email ])],
    });
  }

  onChangePwd() {
    var auth = firebase.auth();
    let email = this.form.controls['email'].value;
    auth.sendPasswordResetEmail(email).then(() => {
      this.msgFlag = false;
    }).catch((error) => {
      console.log("Error occurred while sending Password Reset Email !!!");
    });
  }

  onLogin() {
    this._router.navigate(['/']);
  }

}
