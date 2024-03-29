import { RulesComponent } from './rules.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : '',
    component: RulesComponent,
    children: [
      { path: 'disciplines', loadChildren: () => import('./disciplines/discipline.module').then(m => m.DisciplineModule) },
      { path: 'clans', loadChildren: () => import('./clans/clans.module').then(m => m.ClanModule) },
      { path: 'skills', loadChildren: () => import('./skills/skills.module').then(m => m.SkillsModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RulesRoutingModule { }
