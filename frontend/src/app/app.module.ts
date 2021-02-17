import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyheaderComponent } from './myheader/myheader.component';
import { MyfooterComponent } from './myfooter/myfooter.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistracijaComponent } from './registracija/registracija.component';
import { LoginComponent } from './login/login.component';
import { PartneriComponent } from './partneri/partneri.component';
import { ZaposleniComponent } from './zaposleni/zaposleni.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { MeniZaposleniComponent } from './meni-zaposleni/meni-zaposleni.component';
import { ObavestenjaComponent } from './obavestenja/obavestenja.component';
import { IstrazivanjaComponent } from './istrazivanja/istrazivanja.component';
import { ProjektiNaukaComponent } from './projekti-nauka/projekti-nauka.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { ProjektiComponent } from './projekti/projekti.component';
import { OdsekRTIComponent } from './odsek-rti/odsek-rti.component';
import { OdsekSIComponent } from './odsek-si/odsek-si.component';
import { OdsekOstaloComponent } from './odsek-ostalo/odsek-ostalo.component';
import { MasterComponent } from './master/master.component';
import { PredmetComponent } from './predmet/predmet.component';
import { ProfilZaposlenogComponent } from './profil-zaposlenog/profil-zaposlenog.component';

@NgModule({
  declarations: [
    AppComponent,
    MyheaderComponent,
    MyfooterComponent,
    PocetnaComponent,
    RegistracijaComponent,
    LoginComponent,
    PartneriComponent,
    ZaposleniComponent,
    PromenaLozinkeComponent,
    MeniZaposleniComponent,
    ObavestenjaComponent,
    IstrazivanjaComponent,
    ProjektiNaukaComponent,
    KontaktComponent,
    ProjektiComponent,
    OdsekRTIComponent,
    OdsekSIComponent,
    OdsekOstaloComponent,
    MasterComponent,
    PredmetComponent,
    ProfilZaposlenogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
