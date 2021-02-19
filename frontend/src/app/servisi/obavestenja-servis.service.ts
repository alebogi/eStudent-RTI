import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObavestenjaServisService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000';

  dohvatiObavestenja(){
    return this.http.get(`${this.uri}/dohvatiObavestenja`);
  }

  dohvObavestenjaKategorija(kat:string){
    const data = {
      katrgorija: kat
    }
    return this.http.post(`${this.uri}/dohvObavestenjaKategorija`, data);
  }
}


