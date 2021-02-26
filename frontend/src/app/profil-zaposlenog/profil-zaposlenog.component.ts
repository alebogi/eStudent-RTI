import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { latinicaUcirilicu } from '../app.component';
import { Zaposleni } from '../model/zaposleni.model';
import { KorisnikServisService } from '../servisi/korisnik-servis.service';
import { MaterijaliServisService } from '../servisi/materijali-servis.service';
import {saveAs} from "file-saver";

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

  slika: any;

  constructor(private servis : KorisnikServisService, private ruter:Router, private servisMaterijali:MaterijaliServisService) { }

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
        if(this.zaposleni.photo!=null && this.zaposleni.photo!=undefined){
          this.prikaziSliku()
        }
      }else{
        this.zaposleni = null;
      }
    })
  }


  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.slika = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
  }

  prikaziSliku(){
    this.servisMaterijali.downloadFile(this.zaposleni.photo).subscribe(blob=>{
      //saveAs(blob, this.user.username+".jpg");
      this.createImageFromBlob(blob);
      //this.slika = blob;
    })
  }

  preuzmi(naziv){
    this.servisMaterijali.downloadFile(naziv).subscribe(blob => {
           saveAs(blob, naziv);
       } )
  }
}
