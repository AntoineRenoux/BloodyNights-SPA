import { RitualsComponent } from './rituals/rituals.component';
import { SharedModule } from '@shared/shared.module';
import { DisciplineComponent } from './discipline.component';
import { NgModule } from '@angular/core';
import { DisciplinesRoutingModule } from './discipline-routing.module';

@NgModule({
  imports: [
    SharedModule,
    DisciplinesRoutingModule
  ],
  declarations: [
    DisciplineComponent,
    RitualsComponent
  ],
  exports: [
  ]
})
export class DisciplineModule { }
