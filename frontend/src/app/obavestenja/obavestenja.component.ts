import { Component, OnInit } from '@angular/core';
import { Obavestenja } from '../model/obavestenja.model';
import { ObavestenjaServisService } from '../servisi/obavestenja-servis.service';
import { latinicaUcirilicu } from '../app.component'
import { stringify } from '@angular/compiler/src/util';
import { ispisiDatum } from '../app.component';

@Component({
  selector: 'app-obavestenja',
  templateUrl: './obavestenja.component.html',
  styleUrls: ['./obavestenja.component.css']
})
export class ObavestenjaComponent implements OnInit {
  ulogovan: string;
  ulogovaniTip: string;
  ulogovanUsername: string;
  ulogvanImePrezime: string;

  takmicenja: boolean;
  konferencije: boolean;
  praksa: boolean;
  posao: boolean;

  sveNiz: Obavestenja [] = [];
  takmicenjaNiz: Obavestenja [] = [];
  konferencijeNiz: Obavestenja [] = [];
  praksaNiz: Obavestenja [] = [];
  posaoNiz: Obavestenja [] = [];


  constructor(private servis: ObavestenjaServisService) { }

  ngOnInit(): void {
    this.ulogovan = localStorage.getItem("ulogovan");
    this.ulogovaniTip = localStorage.getItem("ulogovaniTip");
    this.ulogovanUsername = localStorage.getItem("ulogovan_username");
    this.ulogvanImePrezime = localStorage.getItem("ulogovan_imeprezime");

    this.dohvatiObavestenja();
  }

  //proverava da li je obavestenje mladje od tri meseca ili nije
  mladjiOdTriMeseca(datum: string){ //Date
    var result = false;

    var danasnjiDatum = new Date();
    var dat = new Date(datum)
    var diffInMs = danasnjiDatum.getTime() - dat.getTime();
    var msInDay = 1000*60*60*24;
    var diffInDays = diffInMs / msInDay;

    if(diffInDays > (30*3)){
      result = false;
    }else{
      result = true;
    }

    return result;
  }

  datumIspis(str:string){
    return ispisiDatum(str);
  }

  /**
   * dohvata sva obavestenja mladja od 3 meseca, grupise ih i ispisuje 
   */
  dohvatiObavestenja(){
   
    this.servis.dohvatiObavestenja().subscribe((obav: Obavestenja[])=>{
      this.sveNiz = obav;
      
      for (let i = 0; i < this.sveNiz.length; i++){
        
        if(!this.mladjiOdTriMeseca(this.sveNiz[i].datum)){
          continue;
        }

        if(this.sveNiz[i].kategorija == "takmicenja"){
          this.takmicenjaNiz[this.takmicenjaNiz.length] = this.sveNiz[i];
          this.takmicenjaNiz[this.takmicenjaNiz.length - 1].tekst = latinicaUcirilicu( this.takmicenjaNiz[this.takmicenjaNiz.length - 1].tekst);
        }else if (this.sveNiz[i].kategorija == "konferencije"){
          this.konferencijeNiz[this.konferencijeNiz.length] = this.sveNiz[i];
          this.konferencijeNiz[this.konferencijeNiz.length - 1].tekst = latinicaUcirilicu( this.konferencijeNiz[this.konferencijeNiz.length - 1].tekst);
        }else if(this.sveNiz[i].kategorija == "praksa"){
          this.praksaNiz[this.praksaNiz.length] = this.sveNiz[i];
          this.praksaNiz[this.praksaNiz.length - 1].tekst = latinicaUcirilicu( this.praksaNiz[this.praksaNiz.length - 1].tekst);
        }else if(this.sveNiz[i].kategorija == "posao"){
          this.posaoNiz[this.posaoNiz.length] = this.sveNiz[i];
          this.posaoNiz[this.posaoNiz.length - 1].tekst = latinicaUcirilicu( this.posaoNiz[this.posaoNiz.length - 1].tekst);
        }
      }

      if(this.takmicenjaNiz.length == 0){
        this.takmicenja = false;
      }else{
        this.takmicenja = true;
      }
      if(this.konferencijeNiz.length == 0){
        this.konferencije = false;
      }else{
        this.konferencije = true;
      }
      if(this.praksaNiz.length == 0){
        this.praksa = false;
      }else{
        this.praksa = true;
      }
      if(this.posaoNiz.length == 0){
        this.posao = false;
      }else{
        this.posao = true;
      }
    })
  }

  dodajObavestenje(){
//todo: admin sme da dodaje obavestenja
  }

  izmeniObavestenje(){
//todo: admin sme da izmeni obavestenje
  }
}
