import { ClansComponent } from './clans.component';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { ClansRoutingModule } from './clans-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ClansRoutingModule
  ],
  declarations: [
    ClansComponent
  ],
  exports: [
    ClansComponent
  ]
})
export class ClanModule { }
