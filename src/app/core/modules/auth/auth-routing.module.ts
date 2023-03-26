import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ValidateEmailComponent } from './validate-email/validate-email.component';

const routes: Routes = [
  { path: 'connexion', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'email-validation', component: ValidateEmailComponent },
  { path: 'change-password', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
