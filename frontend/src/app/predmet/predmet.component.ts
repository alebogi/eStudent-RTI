import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { latinicaUcirilicu } from '../app.component';
import { Predmeti } from '../model/predmeti.model';
import { PredmetiServisService } from '../servisi/predmeti-servis.service';

@Component({
  selector: 'app-predmet',
  templateUrl: './predmet.component.html',
  styleUrls: ['./predmet.component.css']
})
export class PredmetComponent implements OnInit {
  ulogovan: string;
  ulogovaniTip: string;
  ulogovanUsername: string;
  ulogvanImePrezime: string;

  predmetSifra: string;
  predmet: Predmeti;

  constructor(private servis : PredmetiServisService, private ruter:Router) { }
  

  ngOnInit(): void {
    this.ulogovan = localStorage.getItem("ulogovan");
    this.ulogovaniTip = localStorage.getItem("ulogovaniTip");
    this.ulogovanUsername = localStorage.getItem("ulogovan_username");
    this.ulogvanImePrezime = localStorage.getItem("ulogovan_imeprezime");
    this.predmetSifra = localStorage.getItem("predmet");
    this.dohvatiPredmetInfo();
  }

  prevedi(str:string){
    return latinicaUcirilicu(str);
  }

  dohvatiPredmetInfo(){
    this.servis.dohvatiPredmetInfo(this.predmetSifra).subscribe((odg:Predmeti)=>{
      if(odg){
        this.predmet = odg;
      }else{
        this.predmet = null;
      }
    })
  }
}
