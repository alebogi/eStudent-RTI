import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { latinicaUcirilicu } from '../app.component';
import { Obavestenja } from '../model/obavestenja.model';
import { Predmeti } from '../model/predmeti.model';
import { Zaposleni } from '../model/zaposleni.model';
import { KorisnikServisService } from '../servisi/korisnik-servis.service';
import { ObavestenjaServisService } from '../servisi/obavestenja-servis.service';
import { PredmetiServisService } from '../servisi/predmeti-servis.service';
import { ispisiDatum } from '../app.component';
import {saveAs} from "file-saver";
import { MaterijaliServisService } from '../servisi/materijali-servis.service';
import { Materijal } from '../model/materijal.model';

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

  nastavniciUsername: string[] = [];
  nastavniciImePrezime: string[] = [];

  svaObavestenja:Obavestenja[];
  obavestenjaPredmet: Obavestenja[] = [];
  obavestenjaStarije: Obavestenja[] = [];

  nizMaterijalaPredavanja: Materijal[] = [];
  nizMaterijalaVezbe: Materijal[] = [];
  nizMaterijalaIspit: Materijal[] = [];
  nizMaterijalaLab: Materijal[] = [];

  constructor(private servis : PredmetiServisService, private ruter:Router, private korservis: KorisnikServisService, private obavServis: ObavestenjaServisService, private servisMaterijali: MaterijaliServisService) { }
  

  ngOnInit(): void {
    this.ulogovan = localStorage.getItem("ulogovan");
    this.ulogovaniTip = localStorage.getItem("ulogovaniTip");
    this.ulogovanUsername = localStorage.getItem("ulogovan_username");
    this.ulogvanImePrezime = localStorage.getItem("ulogovan_imeprezime");
    this.predmetSifra = localStorage.getItem("predmet");
    this.dohvatiPredmetInfo();
    this.dohvatiObavestenja(this.predmetSifra);
      this.dohvatiFajlovePredavanja();
      this.dohvatiFajloveVezbe();
      this.dohvatiFajloveIspit();
      this.dohvatiFajloveLab();
  }

  prevedi(str:string){
    return latinicaUcirilicu(str);
  }

  datumIspis(str:string){
    return ispisiDatum(str);
  }

  dohvatiPredmetInfo(){
    this.servis.dohvatiPredmetInfo(this.predmetSifra).subscribe((odg:Predmeti)=>{
      if(odg){
        this.predmet = odg;
        this.predmet.nastavnici.forEach((nast:string) => {
          this.nastavniciUsername.push(nast);
          this.dohvatiImeNastavnika(nast);
        });
        
      }else{
        this.predmet = null;
      }
    })
  }

  dohvatiImeNastavnika(username:string){
    
    this.korservis.dohvatiImePrezimeNastavnika(username).subscribe((odg : Zaposleni)=>{
      if(!odg){
        alert("error");

      }else{
        var str = odg.name + " " + odg.lastname;
        var res = this.prevedi(str);
        this.nastavniciImePrezime.push(res);
      }
      
    });
  }

  preusmeriNaNastavnika(imePrezime:string){
    var index;
    for(let i=0;i<this.nastavniciImePrezime.length;i++){
      if(this.nastavniciImePrezime[i] == imePrezime){
        index = i;
      }
    }

    var username = this.nastavniciUsername[index];
    

    localStorage.setItem("profil", username);
    this.ruter.navigate(['/profil']);
  }

  dohvatiObavestenja(sifra:string){
 

    this.obavServis.dohvatiObavestenja().subscribe((obav: Obavestenja[])=>{
      this.svaObavestenja = obav;
      
      for (let i = 0; i < this.svaObavestenja.length; i++){


        if(this.svaObavestenja[i].kategorija == this.predmetSifra){
          
          if(!this.obavestenjeMladjeOdSedamDana(this.svaObavestenja[i].datum)){
            this.obavestenjaStarije[this.obavestenjaStarije.length] = this.svaObavestenja[i];
            continue;
          }
          this.obavestenjaPredmet[this.obavestenjaPredmet.length] = this.svaObavestenja[i];
          
        }

      }
    
      
    })
  }

  obavestenjeMladjeOdSedamDana(datum: string){
    var result = false;

    var result = false;

    var danasnjiDatum = new Date();
    var dat = new Date(datum)
    var diffInMs = danasnjiDatum.getTime() - dat.getTime();
    var msInDay = 1000*60*60*24;
    var diffInDays = diffInMs / msInDay;

    if(diffInDays > (7)){
      result = false;
    }else{
      result = true;
    }

    return result;
  }

  preuzmi(naziv){
    this.servisMaterijali.downloadFile(naziv).subscribe(blob => {
           saveAs(blob, naziv);
       } )
  }




  dohvatiFajlovePredavanja(){
    this.servisMaterijali.dohvatiFajlove(this.predmetSifra, "predavanja").subscribe((m: Materijal[])=>{
      this.nizMaterijalaPredavanja = m;
    })
  }

  dohvatiFajloveVezbe(){
    this.servisMaterijali.dohvatiFajlove(this.predmetSifra, "vezbe").subscribe((m: Materijal[])=>{
      this.nizMaterijalaVezbe = m;

    })
  }

  

  dohvatiFajloveIspit(){
    this.servisMaterijali.dohvatiFajlove(this.predmetSifra, "ispit").subscribe((m: Materijal[])=>{
      this.nizMaterijalaIspit = m;

    })
  }

  dohvatiFajloveLab(){
    this.servisMaterijali.dohvatiFajlove(this.predmetSifra, "lab").subscribe((m: Materijal[])=>{
      this.nizMaterijalaLab = m;

    })
  }
}

