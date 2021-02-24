import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Predmeti } from '../model/predmeti.model';

@Injectable({
  providedIn: 'root'
})
export class PredmetiServisService {
  uri = 'http://localhost:4000';

  constructor(private http:HttpClient) { }

  dohvatiPredmete(smer: string){
    if(smer == "si"){
      return this.http.get(`${this.uri}/dohvatiPredmeteSI`);
    }else if (smer=="rti"){
      return this.http.get(`${this.uri}/dohvatiPredmeteRTI`);
    }else if (smer=="ostalo"){
      return this.http.get(`${this.uri}/dohvatiPredmeteOstalo`);
    }else if(smer=="master"){
      return this.http.get(`${this.uri}/dohvatiPredmeteMaster`);
    }
    
  }

  dohvatiPredmetInfo(sifra: string){
    const data = {sifra: sifra};
    return this.http.post(`${this.uri}/dohvatiPredmetInfo`, data);
  }

  dodajPredmet(pred: Predmeti){
    const data = {
      p: pred
    };
    return this.http.post(`${this.uri}/dodajPredmet`, data);
  }

  izlistajPredmete(){
    return this.http.get(`${this.uri}/dohvatiPredmeteSVE`);
  }

  obrisiPredmet(sifra: string){
    const data = {
      sifra: sifra
    }

    return this.http.post(`${this.uri}/obrisiPredmet`, data);
  }

  izmeniPredmet(sifra: string, predmet: Predmeti){
    const data = {
      sifra: sifra,
      predmet: predmet
    }

    return this.http.post(`${this.uri}/izmeniPredmet`, data);
  }
}
