import { Component, OnInit } from '@angular/core';
import { Student } from '../model/studenti.model';
import { Zaposleni } from '../model/zaposleni.model';
import { Admin } from '../model/admini.model';
import { KorisnikServisService } from '../servisi/korisnik-servis.service';

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
  ulogovan: boolean = false;

  constructor(private servisKorisnik: KorisnikServisService) { }

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
            alert("uloguj studenta");
          }
        })
      }else if(this.zvanje == "zaposleni"){
        this.servisKorisnik.loginZaposleni(this.username, this.password).subscribe((zaposlen: Zaposleni)=>{
          if(!zaposlen){
            this.mssg = "Не постоји корисник са унетим подацима.\n";
          }else{
            this.mssg = "";
            //uloguj zaposlenog
            alert("uloguj zaposlenog");
          }
        })
      }else if(this.zvanje == "admin"){
        this.servisKorisnik.loginAdmin(this.username, this.password).subscribe((admin: Admin)=>{
          if(!admin){
            this.mssg = "Не постоји корисник са унетим подацима.\n";
          }else{
            this.mssg = "";
            //uloguj admina
            alert("uloguj admina");
          }
        })
      }
      
    }
  }


//  this.ruter.navigate(['korisnik']);

}
