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
  mssg: string;

  constructor(private servisKorisnik: KorisnikServisService) { }

  ngOnInit(): void {
    this.student = {} as Student;
    this.zaposleni = {} as Zaposleni;
    this.mssg = "";
  }

  registerStudent(){
    this.servisKorisnik.registracijaStudent(this.student).subscribe(ob=>{
      if(ob['user']=='ok'){
        alert('student registrovan');
      }
    })
  }

  registerZaposleni(){
    this.servisKorisnik.registracijaZaposleni(this.zaposleni).subscribe(ob=>{
      if(ob['user']=='ok'){
        alert('zaposleni registrovan');
      }
    })
  }
}
