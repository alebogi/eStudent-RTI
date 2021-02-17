
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../model/admini.model';
import { Student } from '../model/studenti.model';
import { Zaposleni } from '../model/zaposleni.model';

@Injectable({
  providedIn: 'root'
})
export class KorisnikServisService {

  uri = 'http://localhost:4000';

  constructor(private http:HttpClient) { }

  loginStudent(username, password){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/loginStudent`, data);
  }

  loginZaposleni(username, password){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/loginZaposleni`, data);
  }

  loginAdmin(username, password){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/loginAdmin`, data);
  }


  registracijaStudent(user){
    const data = user;
    return this.http.post(`${this.uri}/registracijaStudent`, data);
  }

  registracijaZaposleni(user){
    const data = user;
    return this.http.post(`${this.uri}/registracijaZaposleni`, data);
  }

  dohvatiLozinkuStudent(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/dohvatiLozinkuStudent`, data);
  }

  dohvatiLozinkuZaposleni(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/dohvatiLozinkuZaposleni`, data);
  }

  dohvatiLozinkuAdmin(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/dohvatiLozinkuAdmin`, data);
  }

  promeniLozinkuStudent(username, password){
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/promenaLozinkeStudent`, data);
  }

  promeniLozinkuZaposleni(username, password){
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/promenaLozinkeZaposleni`, data);
  }

  promeniLozinkuAdmin(username, password){
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/promenaLozinkeAdmin`, data);
  }

  izlistajZaposlene(){
    return this.http.get(`${this.uri}/dohvatiSveZaposlene`);
  }

  dohvatiZaposlenog(username: string){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/dohvatiZaposlenog`, data);
  }
}
