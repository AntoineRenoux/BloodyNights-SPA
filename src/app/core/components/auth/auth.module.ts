import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ValidateEmailComponent } from './validate-email/validate-email.component';
import { SharedModule } from '@shared/shared.module';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ValidateEmailComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
