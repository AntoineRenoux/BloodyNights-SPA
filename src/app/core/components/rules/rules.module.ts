import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RulesRoutingModule } from './rules-routing.module';
import { DisciplineComponent } from './disciplines/discipline.component';
import { LeftFixedMenuComponent } from './left-fixed-menu/left-fixed-menu.component';
import { MainComponent } from './main/main.component';
import { CommonModule } from '@angular/common';
import { ClansComponent } from './clans/clans.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    RulesRoutingModule
  ],
  declarations: [
    DisciplineComponent,
    LeftFixedMenuComponent,
    MainComponent,
    ClansComponent
  ],
  exports: [
  ]
})
export class RulesModule { }
