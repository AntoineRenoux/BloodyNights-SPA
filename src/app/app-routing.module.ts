import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from '@core/components/inscription/inscription.component';
import { LoginComponent } from '@core/components/login/login.component';

const routes: Routes = [
  { path: 'connexion', component: LoginComponent },
  { path: 'register', component: InscriptionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
