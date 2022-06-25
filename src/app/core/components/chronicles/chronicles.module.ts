import { ChronicleRoutingModule } from './chronicle-routing.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { CreateChroniclesComponent } from './create-chronicles/create-chronicles.component';

import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    SharedModule,
    ChronicleRoutingModule,
    MatStepperModule
  ],
  declarations: [
    CreateChroniclesComponent
  ],
  exports: [
  ]
})
export class ChronicleModule { }
