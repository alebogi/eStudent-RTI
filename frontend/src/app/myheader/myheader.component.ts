import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myheader',
  templateUrl: './myheader.component.html',
  styleUrls: ['./myheader.component.css']
})
export class MyheaderComponent implements OnInit {

  constructor(private router: Router) { }
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

  logout(){
    localStorage.setItem("ulogovan", "ne");
    localStorage.setItem("ulogovaniTip", "");
    localStorage.setItem("ulogovan_username", "");
    localStorage.setItem("ulogovan_imeprezime", "");
    location.reload();
    this.router.navigate(['']);
  }

}
