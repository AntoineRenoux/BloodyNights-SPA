import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule,
  ],
  declarations: [
    SettingsComponent
  ],
  exports: [
  ]
})
export class AccountModule { }
