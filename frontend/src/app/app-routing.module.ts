import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IstrazivanjaComponent } from './istrazivanja/istrazivanja.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { ObavestenjaComponent } from './obavestenja/obavestenja.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
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
  {path: '**', component: PocetnaComponent } //ako ne postoji ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
