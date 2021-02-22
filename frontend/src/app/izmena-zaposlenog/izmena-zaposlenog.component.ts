import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-izmena-zaposlenog',
  templateUrl: './izmena-zaposlenog.component.html',
  styleUrls: ['./izmena-zaposlenog.component.css']
})
export class IzmenaZaposlenogComponent implements OnInit {

  constructor() { }

  ulogovan: string;
  ulogovaniTip: string;
  ulogovanUsername: string;
  ulogvanImePrezime: string;

  ngOnInit(): void {
    this.ulogovan = localStorage.getItem("ulogovan");
    this.ulogovaniTip = localStorage.getItem("ulogovaniTip");
    this.ulogovanUsername = localStorage.getItem("ulogovan_username");
    this.ulogvanImePrezime = localStorage.getItem("ulogovan_imeprezime");
  }

}
