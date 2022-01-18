import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./core/components/auth/auth.module').then(m => m.AuthModule) },
  { path: 'rules', loadChildren: () => import('./core/components/rules/rules.module').then(m => m.RulesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
