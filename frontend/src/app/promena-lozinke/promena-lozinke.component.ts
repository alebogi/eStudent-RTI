import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../model/admini.model';
import { Student } from '../model/studenti.model';
import { Zaposleni } from '../model/zaposleni.model';
import { KorisnikServisService } from '../servisi/korisnik-servis.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private servisKorisnik: KorisnikServisService, private router: Router) { }

  ulogovaniTip: string;
  ulogovanUsername: string;
  oldPass: string;
  newPass1: string;
  newPass2: string;
  mssg: string;

  ngOnInit(): void {
    this.ulogovaniTip = localStorage.getItem("ulogovaniTip");
    this.ulogovanUsername = localStorage.getItem("ulogovan_username");
  }

  proveraIPromena(sifraBaza){
    if(sifraBaza != this.oldPass){
      this.mssg = "Погрешна стара шифра.";
      return;
    }
    
    //provera nove sifre
    if(this.newPass1 != this.newPass2){
      this.mssg = "Шифре се не слажу.";
      return;
    }

    //update sifre
    if(this.ulogovaniTip == "student"){
      this.servisKorisnik.promeniLozinkuStudent(this.ulogovanUsername, this.newPass1).subscribe((mssg : any)=>{
      
        //vratiti korisnika na ekran za prijavljivanje na sistem
        //izloguj ga pre toga
        localStorage.setItem("ulogovan", "ne");
        localStorage.setItem("ulogovaniTip", "");
        localStorage.setItem("ulogovan_username", "");
        localStorage.setItem("ulogovan_imeprezime", "");
        alert("Шифра успешно промењена. Улогујте се поново.");
        this.router.navigate(['']);
  
      });
    }else if(this.ulogovaniTip == "zaposleni"){
      this.servisKorisnik.promeniLozinkuZaposleni(this.ulogovanUsername, this.newPass1).subscribe((mssg : any)=>{
      
        //vratiti korisnika na ekran za prijavljivanje na sistem
        //izloguj ga pre toga
        localStorage.setItem("ulogovan", "ne");
        localStorage.setItem("ulogovaniTip", "");
        localStorage.setItem("ulogovan_username", "");
        localStorage.setItem("ulogovan_imeprezime", "");
        alert("Шифра успешно промењена. Улогујте се поново.");
        this.router.navigate(['']);
  
      });
    }else{
      this.servisKorisnik.promeniLozinkuAdmin(this.ulogovanUsername, this.newPass1).subscribe((mssg : any)=>{
      
        //vratiti korisnika na ekran za prijavljivanje na sistem
        //izloguj ga pre toga
        localStorage.setItem("ulogovan", "ne");
        localStorage.setItem("ulogovaniTip", "");
        localStorage.setItem("ulogovan_username", "");
        localStorage.setItem("ulogovan_imeprezime", "");
        alert("Шифра успешно промењена. Улогујте се поново.");
        this.router.navigate(['']);
  
      });
    }
  }

  promeniLozinku(){
    this.mssg = "";
    
    //dohvati staru sifru korisnika iz baze
    var sifraBaza;
    if(this.ulogovaniTip == "student"){
      this.servisKorisnik.dohvatiLozinkuStudent(this.ulogovanUsername).subscribe((odg : Student)=>{
        if(!odg){
          alert("error");

        }else{
          sifraBaza = odg.password;
          this.proveraIPromena(sifraBaza);
        }
        
      });
    }else if(this.ulogovaniTip == "zaposleni"){
      this.servisKorisnik.dohvatiLozinkuZaposleni(this.ulogovanUsername).subscribe((odg : Zaposleni)=>{    
        sifraBaza = odg.password;
        this.proveraIPromena(sifraBaza);
      });
    }else{
      this.servisKorisnik.dohvatiLozinkuAdmin(this.ulogovanUsername).subscribe((odg : Admin)=>{
        sifraBaza = odg.password;
        this.proveraIPromena(sifraBaza);
      });
    }

    

  }

}
