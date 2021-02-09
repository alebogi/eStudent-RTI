
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
