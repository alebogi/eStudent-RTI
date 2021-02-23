import { Component, OnInit } from '@angular/core';
import { Student } from '../model/studenti.model';
import { KorisnikServisService } from '../servisi/korisnik-servis.service';
import { latinicaUcirilicu } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-izmena-studenta',
  templateUrl: './izmena-studenta.component.html',
  styleUrls: ['./izmena-studenta.component.css']
})
export class IzmenaStudentaComponent implements OnInit {

  constructor(private servisKorisnik: KorisnikServisService, private ruter:Router) { }

  ulogovan: string;
  ulogovaniTip: string;
  ulogovanUsername: string;
  ulogvanImePrezime: string;

  studentiNiz: Student[] = [];
  selektovanStudentUsername: string = "";
  selektovanStudent: Student;
  selected: boolean = false;
  mssg: string = "";

  ngOnInit(): void {
    this.ulogovan = localStorage.getItem("ulogovan");
    this.ulogovaniTip = localStorage.getItem("ulogovaniTip");
    this.ulogovanUsername = localStorage.getItem("ulogovan_username");
    this.ulogvanImePrezime = localStorage.getItem("ulogovan_imeprezime");
    this.selektovanStudent = {} as Student;
    this.izlistajStudente();
  }

  prevedi(str:string){
    return latinicaUcirilicu(str);
  }

  izlistajStudente(){
    this.servisKorisnik.izlistajStudente().subscribe((korisnici: Student[])=>{
      this.studentiNiz = korisnici;
      
    })
  }

  odaberiStudenta(){
    this.servisKorisnik.dohvatiStudenta(this.selektovanStudentUsername).subscribe((s: Student)=>{
      this.selektovanStudent = s;
      this.selected = true;
    })
  }

  obrisiStudenta(){
    if(this.selected == false){
      alert("Нисте одабрали студента за измену.");
      return;
    }
    this.servisKorisnik.obrisiStudenta(this.selektovanStudentUsername).subscribe((err : any)=>{
      alert("Налог студента је успешно обрисан.");
      location.reload();
    });
  }

  izmeniStudenta(){
    if(this.selected == false){
      alert("Нисте одабрали студента за измену.");
      return;
    }

    let greska = false;
    this.mssg = "";
    

    //provera podataka

    //da li je neko polje prazno
    if(this.selektovanStudent.username == null || this.selektovanStudent.password == null || this.selektovanStudent.index == null || this.selektovanStudent.study_type == null
    || this.selektovanStudent.name == null || this.selektovanStudent.lastname == null || this.selektovanStudent.status == null){
      greska = true;
      this.mssg = "Поља означена звездицом не смеју да буду празна. Молимо Вас попуните сва обавезна поља.";
      return;
    }

    //da li su polja pravilno popunjena

    //provera indeksa
    let patternIndex = /^[0-9]{4}\/[0-9]{4}$/
    if(!patternIndex.test(this.selektovanStudent.index)){
      this.mssg = 'Број индекса је у погрешном формату.';
      greska = true;
      return;
    }

    //provera usaglasenosti inicijala, indeksa i username-a
    let i = this.selektovanStudent.name.charAt(0).toLowerCase();
    if(i == 'č' ||  i == 'ć' ){
      i  = 'c';
    }
    if(i == 'š' ){
      i  = 's';
    }
    if(i == 'đ'){
      i  = 'd';
    }
    if(i == 'ž'){
      i  = 'z';
    }
    let p = this.selektovanStudent.lastname.charAt(0).toLowerCase();
    if(p == 'č' ||  p == 'ć' ){
      p  = 'c';
    }
    if(p == 'š' ){
      p  = 's';
    }
    if(p == 'đ'){
      p  = 'd';
    }
    if(p == 'ž'){
      p  = 'z';
    }
    let gggg = this.selektovanStudent.index.slice(0, 4);
    let gg = gggg.slice(2);
    let bbbb = this.selektovanStudent.index.slice(5, 9);
    var pattern1username = new RegExp(p + i + gg + bbbb + this.selektovanStudent.study_type + "@student.etf.rs$");
    var pattern2username = new RegExp(p + i + gg + bbbb + this.selektovanStudent.study_type + "@student.etf.bg.ac.rs$");

    if (!pattern1username.test(this.selektovanStudent.username) && !pattern2username.test(this.selektovanStudent.username)) {
      this.mssg = 'Корисничко име је у погрешном формату.';
      greska = true;
      return;
    }

    //izmena
    this.servisKorisnik.izmeniStudenta(this.selektovanStudentUsername, this.selektovanStudent).subscribe((err : any)=>{
      alert("Налог студента је успешно измењен.");
      location.reload();
    });
  }
 
}
