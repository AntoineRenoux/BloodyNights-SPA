import { ClansComponent } from './clans.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: ':clan/:bloodline', component: ClansComponent },
  { path: ':clan', component: ClansComponent },
  { path: '', component: ClansComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClansRoutingModule { }
