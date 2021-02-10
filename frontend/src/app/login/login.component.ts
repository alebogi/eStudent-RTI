import { Component, OnInit } from '@angular/core';
import { Student } from '../model/studenti.model';
import { Zaposleni } from '../model/zaposleni.model';
import { Admin } from '../model/admini.model';
import { KorisnikServisService } from '../servisi/korisnik-servis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  zvanje: string = "";
  mssg: string = "";
  

  constructor(private servisKorisnik: KorisnikServisService, private router: Router) { }

  ngOnInit(): void {
    this.mssg = "";
  }

  login(){
    this.mssg = "";
    var greska = false;
    if(this.username == ""){
      this.mssg += "Молим Вас унесите корисничко име.\n";
      greska = true;
    }
    if(this.password == ""){
      this.mssg += "Молим Вас унесите шифру.\n";
      greska = true;
    }
    if(this.zvanje == ""){
      this.mssg += "Молим Вас одаберите звање.\n";
      greska = true;
    }
    if(greska == false){
      this.mssg = "";
    }

    if(!greska){
      if(this.zvanje == "student"){
        this.servisKorisnik.loginStudent(this.username, this.password).subscribe((student: Student)=>{
          if(!student){
            this.mssg = "Не постоји корисник са унетим подацима.\n";
          }else{
            this.mssg = "";
            //ulogovati studenta
            localStorage.setItem("ulogovan", "da");
            localStorage.setItem("ulogovaniTip", "student");
            localStorage.setItem("ulogovan_username", this.username);
            let str = student.name + " " + student.lastname;
            localStorage.setItem("ulogovan_imeprezime", str);
            location.reload();
          }
        })
      }else if(this.zvanje == "zaposleni"){
        this.servisKorisnik.loginZaposleni(this.username, this.password).subscribe((zaposlen: Zaposleni)=>{
          if(!zaposlen){
            this.mssg = "Не постоји корисник са унетим подацима.\n";
          }else{
            this.mssg = "";
            //uloguj zaposlenog
            localStorage.setItem("ulogovan", "da");
            localStorage.setItem("ulogovaniTip", "zaposleni");
            localStorage.setItem("ulogovan_username", this.username);
            let str = zaposlen.name + " " + zaposlen.lastname;
            localStorage.setItem("ulogovan_imeprezime", str);
            location.reload();
          }
        })
      }else if(this.zvanje == "admin"){
        this.servisKorisnik.loginAdmin(this.username, this.password).subscribe((admin: Admin)=>{
          if(!admin){
            this.mssg = "Не постоји корисник са унетим подацима.\n";
          }else{
            this.mssg = "";
            //uloguj admina
            localStorage.setItem("ulogovan", "da");
            localStorage.setItem("ulogovaniTip", "admin");
            localStorage.setItem("ulogovan_username", this.username);
            let str = "Ваше височанство";
            localStorage.setItem("ulogovan_imeprezime", str);
            location.reload();
          }
        })
      }
      
    }
  }


//  this.ruter.navigate(['korisnik']);

}
