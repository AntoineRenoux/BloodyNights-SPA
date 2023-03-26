import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./core/modules/auth/auth.module').then(m => m.AuthModule) },
  {
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    path: 'rules',
    loadChildren: () => import('./core/components/rules/rules.module').then(m => m.RulesModule)
  },
  {
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    path: 'account',
    loadChildren: () => import('./core/components/account/account.module').then(m => m.AccountModule)
  },
  {
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    path: 'chronicle',
    loadChildren: () => import('./core/components/chronicles/chronicles.module').then(m => m.ChronicleModule)
  },
  {
    path: '',
    loadChildren: () => import('./core/components/home/home.module').then(m => m.HomeModule)
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
