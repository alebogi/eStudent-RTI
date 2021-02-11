import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { ZaposleniComponent } from './zaposleni/zaposleni.component';

const routes: Routes = [
  {path: "", component: PocetnaComponent},
  {path: "registracija", component: RegistracijaComponent},
  {path: "promenaLozinke", component: PromenaLozinkeComponent},
  {path: "zaposleni", component: ZaposleniComponent},
  {path: '**', component: PocetnaComponent } //ako ne postoji ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
