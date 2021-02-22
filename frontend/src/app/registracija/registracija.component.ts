import { Component, OnInit } from '@angular/core';
import { Student } from '../model/studenti.model';
import { Zaposleni } from '../model/zaposleni.model';
import { KorisnikServisService } from '../servisi/korisnik-servis.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  student: Student;
  zaposleni: Zaposleni;
  mssgStudent: string;
  mssgZaposleni: string;
  mssgStudentUspesno : string;
  mssgZaposleniUspesno: string;

  ulogovan: string;
  ulogovaniTip: string;
  ulogovanUsername: string;
  ulogvanImePrezime: string;

  photo: File;
  photoName: string;
  biography: File;
  biographyName: string;

  constructor(private servisKorisnik: KorisnikServisService) { }

  ngOnInit(): void {
    this.student = {} as Student;
    this.zaposleni = {} as Zaposleni;
    this.mssgStudent = "";
    this.mssgZaposleni = "";
    this.mssgStudentUspesno = "";
    this.mssgZaposleniUspesno = "";

    this.ulogovan = localStorage.getItem("ulogovan");
    this.ulogovaniTip = localStorage.getItem("ulogovaniTip");
    this.ulogovanUsername = localStorage.getItem("ulogovan_username");
    this.ulogvanImePrezime = localStorage.getItem("ulogovan_imeprezime");
  }

  photoChanged(event){
    this.photo = event.target.files[0];
  }

  photoSelected(event){
    this.photoName = this.photo.name;
    
  }

  fileChanged(event){
    this.biography = event.target.files[0];
  }

  fileSelected(event){
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

  registerStudent(){
    let greska = false;
    this.mssgStudent = "";
    this.mssgStudentUspesno = "";

    //provera podataka

    //da li je neko polje prazno
    if(this.student.username == null || this.student.password == null || this.student.index == null || this.student.study_type == null
    || this.student.name == null || this.student.lastname == null || this.student.status == null){
      greska = true;
      this.mssgStudent = "Поља означена звездицом не смеју да буду празна. Молимо Вас попуните сва обавезна поља.";
      return;
    }

    //da li su polja pravilno popunjena

    //provera indeksa
    let patternIndex = /^[0-9]{4}\/[0-9]{4}$/
    if(!patternIndex.test(this.student.index)){
      this.mssgStudent = 'Број индекса је у погрешном формату.';
      greska = true;
      return;
    }

    //provera usaglasenosti inicijala, indeksa i username-a
    let i = this.student.name.charAt(0).toLowerCase();
    let p = this.student.lastname.charAt(0).toLowerCase();
    let gggg = this.student.index.slice(0, 4);
    let gg = gggg.slice(2);
    let bbbb = this.student.index.slice(5, 9);
    var pattern1username = new RegExp(p + i + gg + bbbb + this.student.study_type + "@student.etf.rs$");
    var pattern2username = new RegExp(p + i + gg + bbbb + this.student.study_type + "@student.etf.bg.ac.rs$");

    if (!pattern1username.test(this.student.username) && !pattern2username.test(this.student.username)) {
      this.mssgStudent = 'Корисничко име је у погрешном формату.';
      greska = true;
      return;
    }

    this.student.pass_changed = 0;

    //registracija
    this.servisKorisnik.registracijaStudent(this.student).subscribe(ob=>{
      if(ob['user']=='ok'){
        alert( "Регистрација успешна! Стдент је додат у базу података.");
        location.reload();
       // this.mssgStudentUspesno = "Регистрација успешна! Стдент је додат у базу података.";
      }else if(ob['user']=='no'){
        this.mssgStudent = 'Неуспешна регистрација.';
      }
      if(ob['greska'] != ""){
        this.mssgStudent = 'Корисничко име је заузето.';

      }
    })
  }

  

  registerZaposleni(){
    let greska = false;
    this.mssgZaposleniUspesno = "";
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

    this.zaposleni.pass_changed = 0;

    const data = {
      zaposleni : this.zaposleni,
      slika: this.photo
    }

    

    //registracija
    this.servisKorisnik.registracijaZaposleni(data).subscribe(ob=>{
      if(ob['user']=='ok'){
        this.uploadPhoto();
        this.uploadFile();

        alert("Регистрација успешна! Запослени је додат у базу података.");
        location.reload();

        //this.mssgZaposleniUspesno = "Регистрација успешна! Запослени је додат у базу података.";
      }else if(ob['user']=='no'){
        this.mssgZaposleni = 'Неуспешна регистрација.';
      }
      if(ob['greska'] != ""){
        this.mssgZaposleni = 'Корисничко име је заузето.';
      }
    })
  }
}
