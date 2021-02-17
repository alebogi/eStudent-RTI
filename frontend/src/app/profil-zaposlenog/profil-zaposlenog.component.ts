import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { latinicaUcirilicu } from '../app.component';
import { Zaposleni } from '../model/zaposleni.model';
import { KorisnikServisService } from '../servisi/korisnik-servis.service';

@Component({
  selector: 'app-profil-zaposlenog',
  templateUrl: './profil-zaposlenog.component.html',
  styleUrls: ['./profil-zaposlenog.component.css']
})
export class ProfilZaposlenogComponent implements OnInit {
  ulogovan: string;
  ulogovaniTip: string;
  ulogovanUsername: string;
  ulogvanImePrezime: string;

  zaposleniUsername: string;
  zaposleni: Zaposleni;

  constructor(private servis : KorisnikServisService, private ruter:Router) { }

  ngOnInit(): void {
    this.ulogovan = localStorage.getItem("ulogovan");
    this.ulogovaniTip = localStorage.getItem("ulogovaniTip");
    this.ulogovanUsername = localStorage.getItem("ulogovan_username");
    this.ulogvanImePrezime = localStorage.getItem("ulogovan_imeprezime");
    this.zaposleniUsername = localStorage.getItem("profil");
    this.dohvatiZaposlenog();
  }

  prevedi(str:string){
    return latinicaUcirilicu(str);
  }

  dohvatiZaposlenog(){
    this.servis.dohvatiZaposlenog(this.zaposleniUsername).subscribe((odg:Zaposleni)=>{
      if(odg){
        this.zaposleni = odg;
      }else{
        this.zaposleni = null;
      }
    })
  }
}
