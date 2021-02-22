import { Component, OnInit } from '@angular/core';
import { Student } from '../model/studenti.model';
import { KorisnikServisService } from '../servisi/korisnik-servis.service';
import { latinicaUcirilicu } from '../app.component';

@Component({
  selector: 'app-izmena-studenta',
  templateUrl: './izmena-studenta.component.html',
  styleUrls: ['./izmena-studenta.component.css']
})
export class IzmenaStudentaComponent implements OnInit {

  constructor(private servisKorisnik: KorisnikServisService) { }

  ulogovan: string;
  ulogovaniTip: string;
  ulogovanUsername: string;
  ulogvanImePrezime: string;

  studentiNiz: Student[] = [];
  selektovanStudentUsername: string;
  selektovanStudent: Student;

  ngOnInit(): void {
    this.ulogovan = localStorage.getItem("ulogovan");
    this.ulogovaniTip = localStorage.getItem("ulogovaniTip");
    this.ulogovanUsername = localStorage.getItem("ulogovan_username");
    this.ulogvanImePrezime = localStorage.getItem("ulogovan_imeprezime");
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
      alert(JSON.stringify(this.selektovanStudent));
    })
  }

 
}
