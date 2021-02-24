import { Component, OnInit } from '@angular/core';
import { latinicaUcirilicu } from '../app.component';
import { Zaposleni } from '../model/zaposleni.model';
import { KorisnikServisService } from '../servisi/korisnik-servis.service';

@Component({
  selector: 'app-izmena-profila',
  templateUrl: './izmena-profila.component.html',
  styleUrls: ['./izmena-profila.component.css']
})
export class IzmenaProfilaComponent implements OnInit {

  constructor(private servisKorisnik: KorisnikServisService) { }

  ngOnInit(): void {
    this.ulogovan = localStorage.getItem("ulogovan");
    this.ulogovaniTip = localStorage.getItem("ulogovaniTip");
    this.ulogovanUsername = localStorage.getItem("ulogovan_username");
    this.ulogvanImePrezime = localStorage.getItem("ulogovan_imeprezime");
    this.servisKorisnik.dohvatiZaposlenog(this.ulogovanUsername).subscribe((z: Zaposleni)=>{
      this.zaposleni = z;
    })
  }

  ulogovan: string;
  ulogovaniTip: string;
  ulogovanUsername: string;
  ulogvanImePrezime: string;

  photo: File;
  photoName: string;
  biography: File;
  biographyName: string;

  mssgZaposleni: string;

  zaposleni: Zaposleni;

  prevedi(str:string){
    return latinicaUcirilicu(str);
  }

  //--------------
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



  //-----------

  izmeni(){
    let greska = false;
    this.mssgZaposleni = "";

    //provera podataka

    //da li je neko polje prazno
    if(this.zaposleni.username == null || this.zaposleni.password == null || this.zaposleni.address == null || this.zaposleni.name == null || this.zaposleni.lastname == null || this.zaposleni.status == null || this.zaposleni.title == null){
      greska = true;
      this.mssgZaposleni = "Поља означена звездицом не смеју да буду празна. Молимо Вас попуните сва обавезна поља.";
      return;
    }

    let patternAddress = /^.{1,}\d{1,}.{0,2}, .{1,}$/
    if (!patternAddress.test(this.zaposleni.address)) {
      this.mssgZaposleni = 'Адреса је у погрешном формату.';
      greska = true;
      return;
    }


    if(this.zaposleni.phone != null && this.zaposleni.phone != ""){
      let patternPhone = /^06\d\/[0-9]{6,7}$/
      if (!patternPhone.test(this.zaposleni.phone)) {
        this.mssgZaposleni = 'Број телефона је у погрешном формату.';
        greska = true;
        return;
      }
    }

    

    const data = {
      zaposleni : this.zaposleni,
      slika: this.photo
    }

    //izmena
    this.servisKorisnik.izmeniZaposlenog(this.ulogovanUsername, this.zaposleni).subscribe((err : any)=>{
      alert("Ваш налог је успешно измењен.");
      location.reload();
    });

  }
}
