import { CommonModule } from '@angular/common';
import { DisciplineComponent } from './discipline.component';
import { NgModule } from '@angular/core';
import { DisciplinesRoutingModule } from './discipline-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DisciplinesRoutingModule
  ],
  declarations: [
    DisciplineComponent,
  ],
  exports: [
  ]
})
export class DisciplineModule { }
