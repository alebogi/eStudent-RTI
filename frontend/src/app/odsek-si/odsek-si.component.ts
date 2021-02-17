import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-odsek-si',
  templateUrl: './odsek-si.component.html',
  styleUrls: ['./odsek-si.component.css']
})
export class OdsekSIComponent implements OnInit {
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
