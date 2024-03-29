import { ChronicleRoutingModule } from './chronicle-routing.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { CreateChroniclesComponent } from './create-chronicles/create-chronicles.component';

import { MatStepperModule } from '@angular/material/stepper';
import { ChroniclesListComponent } from './chronicles-list/chronicles-list.component';

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
    CreateChroniclesComponent,
    ChroniclesListComponent
  ],
  exports: [
  ]
})
export class ChronicleModule { }
