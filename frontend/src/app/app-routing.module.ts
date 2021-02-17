import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IstrazivanjaComponent } from './istrazivanja/istrazivanja.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { MasterComponent } from './master/master.component';
import { ObavestenjaComponent } from './obavestenja/obavestenja.component';
import { OdsekOstaloComponent } from './odsek-ostalo/odsek-ostalo.component';
import { OdsekRTIComponent } from './odsek-rti/odsek-rti.component';
import { OdsekSIComponent } from './odsek-si/odsek-si.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PredmetComponent } from './predmet/predmet.component';
import { ProfilZaposlenogComponent } from './profil-zaposlenog/profil-zaposlenog.component';
import { ProjektiNaukaComponent } from './projekti-nauka/projekti-nauka.component';
import { ProjektiComponent } from './projekti/projekti.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { ZaposleniComponent } from './zaposleni/zaposleni.component';

const routes: Routes = [
  {path: "", component: PocetnaComponent},
  {path: "registracija", component: RegistracijaComponent},
  {path: "promenaLozinke", component: PromenaLozinkeComponent},
  {path: "zaposleni", component: ZaposleniComponent},
  {path: "obavestenja", component:ObavestenjaComponent},
  {path: "istrazivanja", component: IstrazivanjaComponent},
  {path: "naukaProjekti", component: ProjektiNaukaComponent},
  {path: "kontakt", component: KontaktComponent},
  {path: "projekti", component: ProjektiComponent},
  {path: "odsekRTI", component: OdsekRTIComponent},
  {path: "odsekSI", component: OdsekSIComponent},
  {path: "odsekOstalo", component: OdsekOstaloComponent},
  {path: "master", component: MasterComponent},
  {path: "predmet", component: PredmetComponent},
  {path: "profil", component: ProfilZaposlenogComponent},
  {path: '**', component: PocetnaComponent } //ako ne postoji ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
