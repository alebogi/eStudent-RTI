import { Component, OnInit } from '@angular/core';
import { latinicaUcirilicu } from '../app.component';

@Component({
  selector: 'app-moji-predmeti',
  templateUrl: './moji-predmeti.component.html',
  styleUrls: ['./moji-predmeti.component.css']
})
export class MojiPredmetiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.ulogovan = localStorage.getItem("ulogovan");
    this.ulogovaniTip = localStorage.getItem("ulogovaniTip");
    this.ulogovanUsername = localStorage.getItem("ulogovan_username");
    this.ulogvanImePrezime = localStorage.getItem("ulogovan_imeprezime");
  }

  ulogovan: string;
  ulogovaniTip: string;
  ulogovanUsername: string;
  ulogvanImePrezime: string;

  prevedi(str:string){
    return latinicaUcirilicu(str);
  }

}
