import { RouterModule } from '@angular/router';
import { SkillsModule } from './skills/skills.module';
import { DisciplineModule } from './disciplines/discipline.module';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { RulesRoutingModule } from './rules-routing.module';
import { LeftFixedMenuComponent } from './left-fixed-menu/left-fixed-menu.component';
import { RulesComponent } from './rules.component';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    RulesRoutingModule,
    DisciplineModule,
    SkillsModule,
    MatSidenavModule,
    MatTreeModule,
  ],
  declarations: [
    LeftFixedMenuComponent,
    RulesComponent,
  ],
  exports: [
  ]
})
export class RulesModule { }
