import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : '',
    // runGuardsAndResolvers: 'always',
    // canActivate: [AuthGuard]
    children: [
      { path: 'disciplines', component: MainComponent },
      { path: 'disciplines/:discipline', component: MainComponent },
      { path: 'disciplines/:discipline/:path', component: MainComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RulesRoutingModule { }
