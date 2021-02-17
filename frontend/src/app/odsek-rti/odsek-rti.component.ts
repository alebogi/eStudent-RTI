import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-odsek-rti',
  templateUrl: './odsek-rti.component.html',
  styleUrls: ['./odsek-rti.component.css']
})
export class OdsekRTIComponent implements OnInit {
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
