import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
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
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    path: 'account',
    loadChildren: () => import('./core/components/account/account.module').then(m => m.AccountModule)
  },
  {
    path: '',
    loadChildren: () => import('./core/components/home/home.module').then(m => m.HomeModule)
  },
  { path: '**', redirectTo: 'not-found' }
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
