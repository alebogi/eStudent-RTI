import { Component, OnInit } from '@angular/core';
import { latinicaUcirilicu } from '../app.component';
import { Materijal } from '../model/materijal.model';
import { Obavestenja } from '../model/obavestenja.model';
import { Predmeti } from '../model/predmeti.model';
import { KorisnikServisService } from '../servisi/korisnik-servis.service';
import { MaterijaliServisService } from '../servisi/materijali-servis.service';
import { ObavestenjaServisService } from '../servisi/obavestenja-servis.service';
import { PredmetiServisService } from '../servisi/predmeti-servis.service';

@Component({
  selector: 'app-dodavanje-vesti',
  templateUrl: './dodavanje-vesti.component.html',
  styleUrls: ['./dodavanje-vesti.component.css']
})
export class DodavanjeVestiComponent implements OnInit {

  constructor(private servisKorisnik: KorisnikServisService, private servisPredmeti: PredmetiServisService, private servisObavestenja: ObavestenjaServisService, private servisMaterijali: MaterijaliServisService) { }

  ngOnInit(): void {
    this.ulogovan = localStorage.getItem("ulogovan");
    this.ulogovaniTip = localStorage.getItem("ulogovaniTip");
    this.ulogovanUsername = localStorage.getItem("ulogovan_username");
    this.ulogvanImePrezime = localStorage.getItem("ulogovan_imeprezime");
    this.vest = {} as Obavestenja;
    this.izlistajPredmete();
    this.vest.autor = this.ulogovanUsername;
    
  }

  mssg: string = "";
  ulogovan: string;
  ulogovaniTip: string;
  ulogovanUsername: string;
  ulogvanImePrezime: string;
  vest: Obavestenja;
  datumUnos:Date;

  predmetiNiz: Predmeti[];
  mojiPredmetiNiz: Predmeti[] = [];

  materijal: File[] = [];
  materijalName: string[] = [];
  nizFajlovaZaBazu: Materijal[] = [];

  nizZaIter: number[];
  brFajlova:number = 0;

  prevedi(str:string){
    return latinicaUcirilicu(str);
  }

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

  fileChanged(event, i){
    var m = new Materijal;
    m.sifraPredmeta = this.vest.kategorija;
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
    m.kategorija = "obavestenje";
    m.naslovObavestenja = this.vest.naslov;


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

  

  uploadFile(i){
    this.servisKorisnik.uploadFile(this.materijal[i]).subscribe(res=>{
      
      if(res["ret"]=="ok")
        alert("Фајл(ови) успешно додат(и) на сервер.");
       else{
         alert("Неуспешно додавање на сервер.")
       } 
    });
  }

  brFajlovaUneseno(){
    this.nizZaIter = [];
    for(let i = 0; i < this.brFajlova; i++){   
      this.nizZaIter.push(1);
    }
  }

  dodaj(){
    

    if(this.vest.naslov == "" || this.vest.naslov == undefined || this.vest.tekst == "" || this.vest.tekst == undefined || this.vest.kategorija == "" || this.vest.kategorija == undefined || this.datumUnos == undefined){
      this.mssg = "Поља не смеју бити празна.";
      return;
    }

    this.vest.materijali = [];
    if(this.materijalName.length != 0){
      for(let i = 0; i < this.materijalName.length; i++){
        //alert(this.materijalName[i])
        this.vest.materijali.push(this.materijalName[i]);
        this.uploadFile(i);
      }
      
      
    }

    var tmps =  Math.trunc(Date.now());
    this.vest.timestamp = tmps;

    var datum = new Date(this.datumUnos);
    var dan = datum.getDate();
    var mesec = datum.getMonth() + 1;
    var god = datum.getFullYear();
    var str = mesec + "-" + dan + "-" + god;
    this.vest.datum = str;
    

    this.servisObavestenja.dodajVest(this.vest).subscribe(ob=>{
      if(ob['v']=='ok'){
        alert( "Додавање успешно!! Вест је додата у базу података.");
        location.reload();
      }else if(ob['v']=='no'){
        this.mssg = 'Неуспешно додавање вести.';
      }
    })

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
    
  }

}
