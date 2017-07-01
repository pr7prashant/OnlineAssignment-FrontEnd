import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faculty-home',
  templateUrl: './faculty-home.component.html',
  styleUrls: ['./faculty-home.component.css']
})
export class FacultyHomeComponent implements OnInit {

  isActive1 = "active";
  isActive2 = "";
  isActive3 = "";

  constructor() { }

  ngOnInit() {
  }

  onclick1() {
    if (this.isActive1 == "") {
      this.isActive1 = "active";
      this.isActive2 = "";
      this.isActive3 = "";
    }
  }

  onclick2() {
    if (this.isActive2 == "") {
      this.isActive2 = "active";
      this.isActive1 = "";
      this.isActive3 = "";
    }
  }

  onclick3() {
    if (this.isActive3 == "") {
      this.isActive3 = "active";
      this.isActive1 = "";
      this.isActive2 = "";
    }
  }

}
