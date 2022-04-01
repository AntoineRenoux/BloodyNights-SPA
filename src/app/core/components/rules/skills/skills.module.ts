import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from './skills.component';
import { SkillsRoutingModule } from './skills-routing.module';

@NgModule({
  declarations: [SkillsComponent],
  imports: [
    SharedModule,
    SkillsRoutingModule
  ]
})
export class SkillsModule { }
