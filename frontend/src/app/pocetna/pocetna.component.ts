import { Component, Input, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {
  ulogovan: boolean = false;
  ulogovaniTip: string;
  ulogovanUsername: string;
  ulogvanImePrezime: string;

  constructor() {
    
  }

  ngOnInit(): void {
    this.proveriUlogovan();
    this.ulogovaniTip = localStorage.getItem("ulogovaniTip");
    this.ulogovanUsername = localStorage.getItem("ulogovan_username");
    this.ulogvanImePrezime = localStorage.getItem("ulogovan_imeprezime");
    
  }

  proveriUlogovan(){
    if(localStorage.getItem("ulogovan") == "da"){
      this.ulogovan = true;
    }else{
      this.ulogovan = false;
    }
  }
   
}


