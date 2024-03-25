import { NgModule } from '@angular/core';
import { StepperComponent } from './stepper.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    StepperComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    StepperComponent
  ]
})
export class StepperModule {

}
