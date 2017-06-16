import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faculty-home',
  templateUrl: './faculty-home.component.html',
  styleUrls: ['./faculty-home.component.css']
})
export class FacultyHomeComponent implements OnInit {

  isActive1="active";
  isActive2="";

  constructor() { }

  ngOnInit() {
  }

  onclick1() {
    if(this.isActive1 == "") {
      this.isActive1 = "active";
      this.isActive2 = "";
    }  
  }

  onclick2() {
    if(this.isActive2 == "") {
      this.isActive2 = "active";
      this.isActive1 = "";
    }
  }

}
