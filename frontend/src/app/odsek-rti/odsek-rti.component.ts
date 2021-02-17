import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { latinicaUcirilicu } from '../app.component'
import { Predmeti } from '../model/predmeti.model';
import { PredmetiServisService } from '../servisi/predmeti-servis.service';

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

  sviPredmeti: Predmeti[];
  
  constructor(private servis : PredmetiServisService, private ruter:Router) { }

  ngOnInit(): void {
    this.ulogovan = localStorage.getItem("ulogovan");
    this.ulogovaniTip = localStorage.getItem("ulogovaniTip");
    this.ulogovanUsername = localStorage.getItem("ulogovan_username");
    this.ulogvanImePrezime = localStorage.getItem("ulogovan_imeprezime");
    this.dohvatiPredmete("rti");
  }

  dohvatiPredmete(smer: string){
    this.servis.dohvatiPredmete(smer).subscribe((odg:Predmeti[])=>{
      if(odg){
        this.sviPredmeti = odg;
      }else{
        this.sviPredmeti = null;
      }
    })
  }

  prevedi(str:string){
    return latinicaUcirilicu(str);
  }

  preusmeri(sifra:string){
    if(this.ulogovaniTip == "zaposleni"){
      localStorage.setItem("predmet", sifra);
      this.ruter.navigate(['/predmet']);
    }else if(this.ulogovaniTip == "student"){
      //provera da li prati taj predmet
      var prati = 1;
      if(prati == 1){
        localStorage.setItem("predmet", sifra);
        this.ruter.navigate(['/predmet']);
      }else{
        //ne treba da preusmeri
      }
      
    }
  }
}
