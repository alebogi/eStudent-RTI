import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-odsek-ostalo',
  templateUrl: './odsek-ostalo.component.html',
  styleUrls: ['./odsek-ostalo.component.css']
})
export class OdsekOstaloComponent implements OnInit {
  ulogovan: string;
  ulogovaniTip: string;
  ulogovanUsername: string;
  ulogvanImePrezime: string;

  constructor() { }

  ngOnInit(): void {
    this.ulogovan = localStorage.getItem("ulogovan");
    this.ulogovaniTip = localStorage.getItem("ulogovaniTip");
    this.ulogovanUsername = localStorage.getItem("ulogovan_username");
    this.ulogvanImePrezime = localStorage.getItem("ulogovan_imeprezime");
  }

}
