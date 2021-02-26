import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Materijal } from '../model/materijal.model';

@Injectable({
  providedIn: 'root'
})
export class MaterijaliServisService {
  uri = 'http://localhost:4000';

  constructor(private http:HttpClient) { }

  dodajFajl(mat: Materijal){
    const data = {
      m: mat
    };
    return this.http.post(`${this.uri}/dodajFajl`, data);
  }

  //----------- fajlovi

  downloadFile(filename) {
    const data = {
      filename: filename
    }
    return this.http.post(`${this.uri}/download`, data, {responseType: "blob"});
  }

  dohvatiFajlove(sifraPredmeta: string, kategorija: string){  
    const data = {
      sifraPredmeta: sifraPredmeta,
      kategorija: kategorija
    };
    return this.http.post(`${this.uri}/dohvatiFajlove`, data);
  }

  obrisiFajl(naziv: string){
    const data = {
      naziv: naziv
    }

    return this.http.post(`${this.uri}/obrisiFajl`, data);
  }
}
