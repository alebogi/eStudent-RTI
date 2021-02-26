import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Obavestenja } from '../model/obavestenja.model';

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

  dodajVest(v: Obavestenja){
    const data = {
      vest: v
    };
    return this.http.post(`${this.uri}/dodajVest`, data);
  }


  obrisiObavestenje(id){
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/obrisiObavestenje`, data);
  }

  dohvatiVest(id){
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/dohvatiVest`, data);
  }


  izmeniVest(id: string, vst: Obavestenja){
    const data = {
      v: vst,
      id: id
    }

    return this.http.post(`${this.uri}/izmeniVest`, data);
  }
}


