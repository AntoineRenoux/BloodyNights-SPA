import { RulesComponent } from './rules.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : '',
    // runGuardsAndResolvers: 'always',
    // canActivate: [AuthGuard]
    component: RulesComponent,
    children: [
      { path: 'disciplines', loadChildren: () => import('./disciplines/discipline.module').then(m => m.DisciplineModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RulesRoutingModule { }
