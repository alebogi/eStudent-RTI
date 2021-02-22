import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-izmena-predmeta',
  templateUrl: './izmena-predmeta.component.html',
  styleUrls: ['./izmena-predmeta.component.css']
})
export class IzmenaPredmetaComponent implements OnInit {

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
