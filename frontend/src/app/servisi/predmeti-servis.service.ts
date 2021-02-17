import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
