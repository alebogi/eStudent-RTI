import { Component, OnInit } from '@angular/core';
import { Zaposleni } from '../model/zaposleni.model';
import  { latinicaUcirilicu } from '../app.component';
import { KorisnikServisService } from '../servisi/korisnik-servis.service';

@Component({
  selector: 'app-izmena-zaposlenog',
  templateUrl: './izmena-zaposlenog.component.html',
  styleUrls: ['./izmena-zaposlenog.component.css']
})
export class IzmenaZaposlenogComponent implements OnInit {

  constructor(private servisKorisnik: KorisnikServisService) { }

  ulogovan: string;
  ulogovaniTip: string;
  ulogovanUsername: string;
  ulogvanImePrezime: string;

  zaposleniNiz: Zaposleni[] = [];
  selektovanZaposleniUsername: string = "";
  selektovanZaposleni: Zaposleni;
  selected: boolean = false;
  mssg: string = "";

  photo: File;
  photoName: string;
  biography: File;
  biographyName: string;
  ngOnInit(): void {
    this.ulogovan = localStorage.getItem("ulogovan");
    this.ulogovaniTip = localStorage.getItem("ulogovaniTip");
    this.ulogovanUsername = localStorage.getItem("ulogovan_username");
    this.ulogvanImePrezime = localStorage.getItem("ulogovan_imeprezime");
    this.izlistajZaposlene();
    this.selektovanZaposleni = {} as Zaposleni;
  }

  //------

  photoChanged(event){
    this.photo = event.target.files[0];
  }

  photoSelected(){
    this.photoName = this.photo.name;
    
  }

  fileChanged(event){
    this.biography = event.target.files[0];
  }

  fileSelected(){
    this.biographyName = this.biography.name;
    
  }

  uploadFile(){
    this.servisKorisnik.uploadFile(this.biography).subscribe(res=>{
      console.log("USPEH:)");
      if(res["ret"]=="ok")
        alert("Uspesan upload fajla");
        
    });
  }

  uploadPhoto(){
    this.servisKorisnik.uploadPhoto(this.photo).subscribe(res=>{
      if(res["ret"]=="ok")
        alert("Uspesan upload slike");
        
    });
  }

  //----


  prevedi(str:string){
    return latinicaUcirilicu(str);
  }

  izlistajZaposlene(){
    this.servisKorisnik.izlistajZaposlene().subscribe((korisnici: Zaposleni[])=>{
      this.zaposleniNiz = korisnici;
      
    })
  }

  odaberiZaposlenog(){
    this.servisKorisnik.dohvatiZaposlenog(this.selektovanZaposleniUsername).subscribe((z: Zaposleni)=>{
      this.selektovanZaposleni = z;
      this.selected = true;
    })
  }

  obrisiZaposlenog(){
    if(this.selected == false){
      alert("Нисте одабрали запосленог за измену.");
      return;
    }
    this.servisKorisnik.obrisiZaposlenog(this.selektovanZaposleniUsername).subscribe((err : any)=>{
      alert("Налог запосленог је успешно обрисан.");
      location.reload();
    });
  }

  izmeniZaposlenog(){
    if(this.selected == false){
      alert("Нисте одабрали запосленог за измену.");
      return;
    }

    let greska = false;
    this.mssg = "";

    //provera podataka

    //da li je neko polje prazno
    if(this.selektovanZaposleni.username == null || this.selektovanZaposleni.password == null || this.selektovanZaposleni.address == null || this.selektovanZaposleni.name == null || this.selektovanZaposleni.lastname == null || this.selektovanZaposleni.status == null || this.selektovanZaposleni.title == null){
      greska = true;
      this.mssg = "Поља означена звездицом не смеју да буду празна. Молимо Вас попуните сва обавезна поља.";
      return;
    }

    let patternAddress = /^.{1,}\d{1,}.{0,2}, .{1,}$/
    if (!patternAddress.test(this.selektovanZaposleni.address)) {
      this.mssg = 'Адреса је у погрешном формату.';
      greska = true;
      return;
    }


    if(this.selektovanZaposleni.phone != null && this.selektovanZaposleni.phone != ""){
      let patternPhone = /^06\d\/[0-9]{6,7}$/
      if (!patternPhone.test(this.selektovanZaposleni.phone)) {
        this.mssg = 'Број телефона је у погрешном формату.';
        greska = true;
        return;
      }
    }

    

    const data = {
      zaposleni : this.selektovanZaposleni,
      slika: this.photo
    }

    //izmena
    this.servisKorisnik.izmeniZaposlenog(this.selektovanZaposleniUsername, this.selektovanZaposleni).subscribe((err : any)=>{
      alert("Налог запосленог је успешно измењен.");
      location.reload();
    });
  }
}
