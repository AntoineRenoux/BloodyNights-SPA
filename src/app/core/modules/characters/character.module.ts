import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

import { MatStepperModule } from '@angular/material/stepper';
import { CharacterRoutingModule } from './character-routing.module';
import { CreateCharacterComponent } from './create-character/create-character.component';

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
    CreateCharacterComponent
  ],
  exports: [
  ]
})
export class CharacterModule { }
