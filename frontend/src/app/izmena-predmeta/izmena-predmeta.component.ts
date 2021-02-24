import { Component, OnInit } from '@angular/core';
import { latinicaUcirilicu } from '../app.component';
import { Predmeti } from '../model/predmeti.model';
import { Zaposleni } from '../model/zaposleni.model';
import { KorisnikServisService } from '../servisi/korisnik-servis.service';
import { PredmetiServisService } from '../servisi/predmeti-servis.service';

@Component({
  selector: 'app-izmena-predmeta',
  templateUrl: './izmena-predmeta.component.html',
  styleUrls: ['./izmena-predmeta.component.css']
})
export class IzmenaPredmetaComponent implements OnInit {

  constructor(private servisKorisnik: KorisnikServisService, private servisPredmeti: PredmetiServisService) { }
  

  ulogovan: string;
  ulogovaniTip: string;
  ulogovanUsername: string;
  ulogvanImePrezime: string;

  selected: boolean = false;

  ngOnInit(): void {
    this.ulogovan = localStorage.getItem("ulogovan");
    this.ulogovaniTip = localStorage.getItem("ulogovaniTip");
    this.ulogovanUsername = localStorage.getItem("ulogovan_username");
    this.ulogvanImePrezime = localStorage.getItem("ulogovan_imeprezime");
    this.predmet = {} as Predmeti;
    this.izlistajPredmete();
    this.izlistajZaposlene();
  }

  mssg:string = "";

  predmet: Predmeti;
  brojTerminaPredavanja: number;
  brojTerminaVezbe: number;
  terminPredavanjaDan: string [] = [];
  terminPredavanjaSat: number [] = [];
  terminVezbiDan: string [] = [];
  terminVezbiSat: number[] = [];
  nizZaIter: number[] = [];
  nizZaIter2: number[] = [];

  selektovanZaposleniUsername: string[] = [];
  zaposleniNiz: Zaposleni[] = [];
  profNiz: Zaposleni[] = [];

  
  predmetiNiz: Predmeti[];
  selektovanPredmetSifra: string = "";

  prevedi(str:string){
    return latinicaUcirilicu(str);
  }

  izlistajPredmete(){
    this.servisPredmeti.izlistajPredmete().subscribe((pred: Predmeti[])=>{
      this.predmetiNiz = pred;

      
      
    })
  }

  izlistajZaposlene(){
    this.servisKorisnik.izlistajZaposlene().subscribe((korisnici: Zaposleni[])=>{
      this.zaposleniNiz = korisnici;
      for(let i = 0; i < this.zaposleniNiz.length; i++){
        if(this.zaposleniNiz[i].title != "lab. inž." && this.zaposleniNiz[i].title != "istraživač" && this.zaposleniNiz[i].title != "lab. tehničar")
          this.profNiz.push(this.zaposleniNiz[i]);
      }
    })
  }

  brTerminaPredavanjaUneseno(){
    this.nizZaIter = [];
    for(let i = 0; i < this.brojTerminaPredavanja - 1; i++){   
      this.nizZaIter.push(1);
    }
  }

  brTerminaVezbeUneseno(){
    this.nizZaIter2 = [];
    for(let i = 0; i < this.brojTerminaVezbe - 1; i++){   
      this.nizZaIter2.push(1);
    }
  }

  odaberiPredmet(){  
    this.servisPredmeti.dohvatiPredmetInfo(this.selektovanPredmetSifra).subscribe((p: Predmeti)=>{
      this.predmet = p;
      this.selected = true;

      this.brojTerminaPredavanja = parseInt(this.predmet.fond.charAt(0));
      this.brojTerminaVezbe = parseInt(this.predmet.fond.charAt(2));
      this.brTerminaPredavanjaUneseno();
      this.brTerminaVezbeUneseno();
      for(let i = 0; i < this.predmet.nastavnici.length; i++){
        this.selektovanZaposleniUsername.push(this.predmet.nastavnici[i].toString());
      }
      for(let i = 0; i < this.predmet.terminiPredavanja.length; i++){
        this.terminPredavanjaDan[i] = this.predmet.terminiPredavanja[i].toString().split(" ")[0];
        this.terminPredavanjaSat[i] = parseInt(this.predmet.terminiPredavanja[i].toString().split(" ")[1]);
      }
      for(let i = 0; i < this.predmet.terminiVezbe.length; i++){
        this.terminVezbiDan[i] = this.predmet.terminiVezbe[i].toString().split(" ")[0];
        this.terminVezbiSat[i] = parseInt(this.predmet.terminiVezbe[i].toString().split(" ")[1]);
      }
    })
  }

  izmeni(){
    if(this.selected == false){
      alert("Нисте одабрали предмет за измену.");
      return;
    }
    if(this.predmet.naziv == "" || this.predmet.naziv == undefined || this.predmet.naziv == null ||
    this.predmet.sifra == "" || this.predmet.sifra == undefined || this.predmet.sifra == null ||
    this.predmet.tip == "" || this.predmet.tip == undefined || this.predmet.tip == null ||
    this.predmet.semestar == undefined || this.predmet.semestar == null ||
    this.predmet.smer == "" || this.predmet.smer == undefined || this.predmet.smer == null ||
   this.predmet.cilj == "" || this.predmet.cilj == undefined || this.predmet.cilj == null || 
   this.predmet.ishod == "" || this.predmet.ishod == undefined || this.predmet.ishod == null){
      this.mssg = "Ни једно поље не сме бити празно.";
      return;
    }

    if(this.predmet.semestar == 1 || this.predmet.semestar == 2){
      this.predmet.godina = 1;
    }else if(this.predmet.semestar == 3 || this.predmet.semestar == 4){
      this.predmet.godina = 2;
    }else if(this.predmet.semestar == 5 || this.predmet.semestar == 6){
      this.predmet.godina = 3;
    }if(this.predmet.semestar == 7 || this.predmet.semestar == 8){
      this.predmet.godina = 4;
    }

    this.predmet.labVezbe = null;
    this.predmet.dodatno = null;
    this.predmet.projekat = null;
    this.predmet.predavanjaMaterijali =  [];
    this.predmet.vezbeMaterijali = [];
    this.predmet.ispitPitanja = [];
    this.predmet.ispitResenja = [];
    this.predmet.labVezbeMaterijali = [];
    this.predmet.projekatMaterijali = [];
    this.predmet.labAktivno = 1;
    this.predmet.projAktivno = 0;
    this.predmet.ispitAktivno = 0;
    this.predmet.terminiPredavanja = [];
    this.predmet.terminiVezbe = [];
    //this.predmet.nastavnici = [];

    this.predmet.fond = this.brojTerminaPredavanja + "+" + this.brojTerminaVezbe;

    var ter = "";
    for(let i = 0; i < this.terminPredavanjaDan.length; i++){   
      ter = this.terminPredavanjaDan[i] + " " + this.terminPredavanjaSat[i] + "h";
      this.predmet.terminiPredavanja.push(ter)
    }

    ter = "";
    for(let i = 0; i < this.terminVezbiDan.length; i++){   
      ter = this.terminVezbiDan[i] + " " + this.terminVezbiSat[i] + "h";
      this.predmet.terminiVezbe.push(ter)
    }

    // for(var i = 0; i < this.selektovanZaposleniUsername.length; i++){
    //   this.predmet.nastavnici[i] = this.selektovanZaposleniUsername[i];
    // }

    this.servisPredmeti.izmeniPredmet(this.selektovanPredmetSifra, this.predmet).subscribe((err : any)=>{
      alert("Предмет је успешно измењен.");
      location.reload();
    });
    
  }

  obrisiPredmet(){
    if(this.selected == false){
      alert("Нисте одабрали предмет за измену.");
      return;
    }
    this.servisPredmeti.obrisiPredmet(this.selektovanPredmetSifra).subscribe((err : any)=>{
      alert("Предмет је успешно обрисан.");
      location.reload();
    });
  }
}
