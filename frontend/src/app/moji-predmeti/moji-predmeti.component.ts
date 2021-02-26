import { Component, OnInit } from '@angular/core';
import { latinicaUcirilicu } from '../app.component';
import { Materijal } from '../model/materijal.model';
import { Predmeti } from '../model/predmeti.model';
import { Zaposleni } from '../model/zaposleni.model';
import { KorisnikServisService } from '../servisi/korisnik-servis.service';
import { MaterijaliServisService } from '../servisi/materijali-servis.service';
import { PredmetiServisService } from '../servisi/predmeti-servis.service';
import {saveAs} from "file-saver";

@Component({
  selector: 'app-moji-predmeti',
  templateUrl: './moji-predmeti.component.html',
  styleUrls: ['./moji-predmeti.component.css']
})
export class MojiPredmetiComponent implements OnInit {

  constructor(private servisKorisnik: KorisnikServisService, private servisPredmeti: PredmetiServisService, private servisMaterijali: MaterijaliServisService) { }

  ngOnInit(): void {
    this.ulogovan = localStorage.getItem("ulogovan");
    this.ulogovaniTip = localStorage.getItem("ulogovaniTip");
    this.ulogovanUsername = localStorage.getItem("ulogovan_username");
    this.ulogvanImePrezime = localStorage.getItem("ulogovan_imeprezime");
    this.izlistajPredmete();
    this.predmet = {} as Predmeti;
  }

  ulogovan: string;
  ulogovaniTip: string;
  ulogovanUsername: string;
  ulogvanImePrezime: string;

  mssg:string = "";
  selected:boolean = false;

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
  mojiPredmetiNiz: Predmeti[] = [];
  selektovanPredmetSifra: string = "";


  nizMaterijalaPredavanja: Materijal[] = [];
  nizMaterijalaVezbe: Materijal[] = [];
  nizMaterijalaObavestenja: Materijal[] = [];
  nizMaterijalaIspit: Materijal[] = [];
  nizMaterijalaLab: Materijal[] = [];
  
  materijal: File[] = [];
  materijalName: string[] = [];
  nizFajlovaZaBazu: Materijal[] = [];

  nizZaIterPr: number[];
  brFajlovaPr:number = 0;
  nizZaIterVezbe: number[];
  brFajlovaVezbe:number = 0;
  nizZaIterIspit: number[];
  brFajlovaIspit:number = 0;
  nizZaIterLab: number[];
  brFajlovaLab:number = 0;


  prevedi(str:string){
    return latinicaUcirilicu(str);
  }

  public navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
}

  /**
   * Izlistava predmete na kojima je angazovan ulogvani nastavnik.
   */
  izlistajPredmete(){
    this.servisPredmeti.izlistajPredmete().subscribe((pred: Predmeti[])=>{
      this.predmetiNiz = pred;

      this.predmetiNiz.forEach(pred => {
        pred.nastavnici.forEach(nast => {
          if (nast == this.ulogovanUsername){
            this.mojiPredmetiNiz.push(pred);
          }
        });
      });
      
      
    })
  }

  dohvatiFajlovePredavanja(){
    this.servisMaterijali.dohvatiFajlove(this.selektovanPredmetSifra, "predavanja").subscribe((m: Materijal[])=>{
      this.nizMaterijalaPredavanja = m;
    })
  }

  dohvatiFajloveVezbe(){
    this.servisMaterijali.dohvatiFajlove(this.selektovanPredmetSifra, "vezbe").subscribe((m: Materijal[])=>{
      this.nizMaterijalaVezbe = m;

    })
  }

  dohvatiFajloveObavestenja(){
    this.servisMaterijali.dohvatiFajlove(this.selektovanPredmetSifra, "obavestenje").subscribe((m: Materijal[])=>{
      this.nizMaterijalaObavestenja = m;

    })
  }

  dohvatiFajloveIspit(){
    this.servisMaterijali.dohvatiFajlove(this.selektovanPredmetSifra, "ispit").subscribe((m: Materijal[])=>{
      this.nizMaterijalaIspit = m;

    })
  }

  dohvatiFajloveLab(){
    this.servisMaterijali.dohvatiFajlove(this.selektovanPredmetSifra, "lab").subscribe((m: Materijal[])=>{
      this.nizMaterijalaLab = m;

    })
  }

  obrisiFajl(naziv){
    this.servisMaterijali.obrisiFajl(naziv).subscribe((err : any)=>{
      alert("Фајл је успешно обрисан.");
      location.reload();
    });
  }
  
  
  pretvoriUKB(br){
    var r = br / 1024;
   // r = parseFloat(r.toFixed(2))
    return r;
  }

  fileChanged(event, i, kat){
    var m = new Materijal;
    m.sifraPredmeta = this.selektovanPredmetSifra;
    m.nazivFajla = event.target.files[0].name;
    m.tip = m.nazivFajla.split(".")[1];
    var dat = new Date();
    var dan = dat.getDate();
    var mesec = dat.getMonth() + 1;
    var god = dat.getFullYear();
    var str = mesec + "-" + dan + "-" + god;
    m.datumPostavljanja = str;
    m.postavio = this.ulogovanUsername;
    m.postavioImePrezime = this.ulogvanImePrezime;
    m.velicina = event.target.files[0].size;
    m.kategorija = kat;


    if(this.materijal[i] == undefined){
      this.materijal.push(event.target.files[0]);
      this.materijalName.push(event.target.files[0].name)
      this.nizFajlovaZaBazu.push(m);
    }else{
      this.materijal[i] = event.target.files[0];
      this.materijalName[i] = event.target.files[0].name;
      this.nizFajlovaZaBazu[i] = m;
    }
    
  }

  brFajlovaUnesenoPr(){
    this.nizZaIterPr = [];
    for(let i = 0; i < this.brFajlovaPr; i++){   
      this.nizZaIterPr.push(1);
    }
  }
  brFajlovaUnesenoVezbe(){
    this.nizZaIterVezbe = [];
    for(let i = 0; i < this.brFajlovaVezbe; i++){   
      this.nizZaIterVezbe.push(1);
    }
  }
  brFajlovaUnesenoIspit(){
    this.nizZaIterIspit = [];
    for(let i = 0; i < this.brFajlovaIspit; i++){   
      this.nizZaIterIspit.push(1);
    }
  }
  brFajlovaUnesenoLab(){
    this.nizZaIterLab = [];
    for(let i = 0; i < this.brFajlovaLab; i++){   
      this.nizZaIterLab.push(1);
    }
  }

  dodajFajlove(){
    if(this.materijalName.length != 0){
      for(let i = 0; i < this.materijalName.length; i++){ 
        this.uploadFile(i);
      }
      this.nizFajlovaZaBazu.forEach(element => {
        this.servisMaterijali.dodajFajl(element).subscribe(ob=>{
          if(ob['m']=='ok'){
            alert( "Додавање успешно!! Материјали су додати у базу података.");
            location.reload();
          }else if(ob['m']=='no'){
            this.mssg = 'Неуспешно додавање материјала.';
          }
        })
      });
      location.reload();
      
    }
  }

  preuzmi(naziv){
    this.servisMaterijali.downloadFile(naziv).subscribe(blob => {
           saveAs(blob, naziv);
       } )
  }

  uploadFile(i){
    this.servisKorisnik.uploadFile(this.materijal[i]).subscribe(res=>{
      
      if(res["ret"]=="ok")
        alert("Фајл(ови) успешно додат(и) на сервер.");
       else{
         alert("Неуспешно додавање на сервер.")
       } 
    });
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

      this.dohvatiFajloveObavestenja();
      this.dohvatiFajlovePredavanja();
      this.dohvatiFajloveVezbe();
      this.dohvatiFajloveIspit();
      this.dohvatiFajloveLab();
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

  
     this.predmet.terminiPredavanja = [];
     this.predmet.terminiVezbe = [];
    

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

   

    this.servisPredmeti.izmeniPredmet(this.selektovanPredmetSifra, this.predmet).subscribe((err : any)=>{
      alert("Предмет је успешно измењен.");
      location.reload();
    });
    
  }

}
