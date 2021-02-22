import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dodavanje-predmeta',
  templateUrl: './dodavanje-predmeta.component.html',
  styleUrls: ['./dodavanje-predmeta.component.css']
})
export class DodavanjePredmetaComponent implements OnInit {

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
}
