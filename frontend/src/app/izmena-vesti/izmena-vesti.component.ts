import { Component, OnInit } from '@angular/core';
import { latinicaUcirilicu } from '../app.component';
import { Materijal } from '../model/materijal.model';
import { Obavestenja } from '../model/obavestenja.model';
import { Predmeti } from '../model/predmeti.model';
import { MaterijaliServisService } from '../servisi/materijali-servis.service';
import { ObavestenjaServisService } from '../servisi/obavestenja-servis.service';
import { PredmetiServisService } from '../servisi/predmeti-servis.service';


@Component({
  selector: 'app-izmena-vesti',
  templateUrl: './izmena-vesti.component.html',
  styleUrls: ['./izmena-vesti.component.css']
})
export class IzmenaVestiComponent implements OnInit {

  constructor(private servisObavestenja: ObavestenjaServisService, private servisPredmeti: PredmetiServisService, private servisMaterijali:MaterijaliServisService) { }

  ngOnInit(): void {
    this.ulogovan = localStorage.getItem("ulogovan");
    this.ulogovaniTip = localStorage.getItem("ulogovaniTip");
    this.ulogovanUsername = localStorage.getItem("ulogovan_username");
    this.ulogvanImePrezime = localStorage.getItem("ulogovan_imeprezime");
    this.izlistajPredmete();
    this.vest = {} as Obavestenja;
    
  }

  ulogovan: string;
  ulogovaniTip: string;
  ulogovanUsername: string;
  ulogvanImePrezime: string;

  predmetiNiz: Predmeti[] = [];
  mojiPredmetiNiz: Predmeti[] = [];

  
  vestiSaMojihPredmeta: Obavestenja[] = [];
  vestiMoje: Obavestenja[] = [];

  selektovanaVestIzmena: string;
  selektovanaVestBrisanje: number;
  selected: boolean = false;

  vest:Obavestenja;

  materijal: File[] = [];
  materijalName: string[] = [];
  nizFajlovaZaBazu: Materijal[] = [];
  nizMaterijalaObavestnja: Materijal[] = [];

  nizZaIter: number[];
  brFajlova:number = 0;

  datumUnos: Date;
  datumStari: string;

  
  
  prevedi(str:string){
    return latinicaUcirilicu(str);
  }

  /**
   * Izlistava sifre predmeta na kojima je ulogovani profesor angazovan
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
      
      this.izlistajVesi();
    })
  }

  izlistajVesi(){
    this.servisObavestenja.dohvatiObavestenja().subscribe((o: Obavestenja[])=>{
      o.forEach(element => {


        this.mojiPredmetiNiz.forEach(p => {
          if(element.kategorija == p.sifra){
            this.vestiSaMojihPredmeta.push(element);
            if(element.autor == this.ulogovanUsername){
              this.vestiMoje.push(element);
            }
          }

        });
        
        
      });
      
     
    })
  }

  obrisi(){
    if(this.selektovanaVestBrisanje == undefined){
      alert("Нисте одабрали вест за брисање.");
      return;
    }
    
    this.servisObavestenja.obrisiObavestenje(this.selektovanaVestBrisanje).subscribe((err : any)=>{
      alert("Вест је успешно обрисана.");
      location.reload();
    });
  }

  obrisiFajl(naziv){
    this.servisMaterijali.obrisiFajl(naziv).subscribe((err : any)=>{
      alert("Фајл је успешно обрисан.");
      location.reload();
    });
  }


  odaberi(){
    this.servisObavestenja.dohvatiVest(this.selektovanaVestIzmena).subscribe((v : Obavestenja)=>{
      this.vest = v;
      this.selected = true;
      
      
      var datum = new Date(this.vest.datum);
      var dan = datum.getDate();
      var mesec = datum.getMonth() + 1;
      var god = datum.getFullYear();
      var str = god + "-" + mesec + "-" + dan;
      this.datumUnos = new Date(str);

      this.datumStari = dan + "-" + mesec + "-" + god;
      
      this.dohvatiFajlove();
    });
  }

  dohvatiFajlove(){
    this.servisMaterijali.dohvatiFajlove(this.vest.kategorija
      , "obavestenje").subscribe((m: Materijal[])=>{
      m.forEach(element => {
        if(element.naslovObavestenja == this.selektovanaVestIzmena){
          this.nizMaterijalaObavestnja.push(element);
        }
      });
    })
  }

  brFajlovaUneseno(){
    this.nizZaIter = [];
    for(let i = 0; i < this.brFajlova; i++){   
      this.nizZaIter.push(1);
    }
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

  izmeni(){

    var datum = new Date(this.datumUnos);
    var dan = datum.getDate();
    var mesec = datum.getMonth() + 1;
    var god = datum.getFullYear();
    var str = mesec + "-" + dan + "-" + god;
    this.vest.datum = str;

    
    this.vest.autor = this.ulogovanUsername;

    this.servisObavestenja.izmeniVest(this.selektovanaVestIzmena, this.vest).subscribe((err : any)=>{
      alert("Вест је успешно измењена.");
      location.reload();
    });
  }
}
