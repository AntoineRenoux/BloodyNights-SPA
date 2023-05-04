import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

import { MatStepperModule } from '@angular/material/stepper';
import { CharacterRoutingModule } from './character-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    SharedModule,
    MatStepperModule,
    CharacterRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class CharacterModule { }
