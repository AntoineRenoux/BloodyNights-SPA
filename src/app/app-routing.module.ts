import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./core/components/auth/auth.module').then(m => m.AuthModule) },
  {
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    path: 'rules',
    loadChildren: () => import('./core/components/rules/rules.module').then(m => m.RulesModule)
  },
  {
    path: '**', redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
