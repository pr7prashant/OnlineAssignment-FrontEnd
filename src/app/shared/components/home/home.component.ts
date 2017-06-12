import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsernameValidators } from "app/shared/validators/usernameValidators";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit() {

    this.form = this._fb.group({
      email: ['', Validators.compose([ Validators.required, Validators.email ])],
      password: ['', Validators.compose([ Validators.required ])]
    })
  }

}
