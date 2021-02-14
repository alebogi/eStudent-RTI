import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projekti-nauka',
  templateUrl: './projekti-nauka.component.html',
  styleUrls: ['./projekti-nauka.component.css']
})
export class ProjektiNaukaComponent implements OnInit {
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
