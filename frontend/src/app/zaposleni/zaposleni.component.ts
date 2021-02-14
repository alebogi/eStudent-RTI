import { Component, OnInit } from '@angular/core';
import { Zaposleni } from '../model/zaposleni.model';
import { KorisnikServisService } from '../servisi/korisnik-servis.service';
import { latinicaUcirilicu } from '../app.component'

@Component({
  selector: 'app-zaposleni',
  templateUrl: './zaposleni.component.html',
  styleUrls: ['./zaposleni.component.css']
})
export class ZaposleniComponent implements OnInit {

  constructor(private servisKorisnik: KorisnikServisService) { }

  ulogovan: string;
  ulogovaniTip: string;
  ulogovanUsername: string;
  ulogvanImePrezime: string;

  zaposleniNiz: Zaposleni[];

  ngOnInit(): void {
    this.ulogovan = localStorage.getItem("ulogovan");
    this.ulogovaniTip = localStorage.getItem("ulogovaniTip");
    this.ulogovanUsername = localStorage.getItem("ulogovan_username");
    this.ulogvanImePrezime = localStorage.getItem("ulogovan_imeprezime");
    
    this.izlistajZaposlene();
  }

  izlistajZaposlene(){
    this.servisKorisnik.izlistajZaposlene().subscribe((korisnici: Zaposleni[])=>{
      this.zaposleniNiz = korisnici;
      for (let i = 0; i < this.zaposleniNiz.length; i++){
        this.zaposleniNiz[i].name = latinicaUcirilicu(this.zaposleniNiz[i].name);
        this.zaposleniNiz[i].lastname = latinicaUcirilicu(this.zaposleniNiz[i].lastname);
        this.zaposleniNiz[i].title = latinicaUcirilicu(this.zaposleniNiz[i].title);
      }
    })
    
    

  }

}
