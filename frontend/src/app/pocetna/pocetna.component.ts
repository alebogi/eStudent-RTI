import { Component, Input, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {
  ulogovan: boolean = false;
  

  constructor() {
    
  }

  ngOnInit(): void {
    this.proveriUlogovan();
  }

  proveriUlogovan(){
    if(localStorage.getItem("ulogovan") == "da"){
      this.ulogovan = true;
    }else{
      this.ulogovan = false;
    }
  }
   
}


