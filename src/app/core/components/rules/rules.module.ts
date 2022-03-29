import { DisciplineModule } from './disciplines/discipline.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RulesRoutingModule } from './rules-routing.module';
import { LeftFixedMenuComponent } from './left-fixed-menu/left-fixed-menu.component';
import { RulesComponent } from './rules.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    RulesRoutingModule,
    DisciplineModule
  ],
  declarations: [
    LeftFixedMenuComponent,
    RulesComponent,
  ],
  exports: [
  ]
})
export class RulesModule { }
