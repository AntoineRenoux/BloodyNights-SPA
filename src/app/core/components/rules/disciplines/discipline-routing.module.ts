import { RitualsComponent } from './rituals/rituals.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplineComponent } from './discipline.component';

const routes: Routes = [
  { path : ':discipline/rituals/:ritual', component: RitualsComponent },
  { path : ':discipline/:path', component: DisciplineComponent },
  { path : ':discipline', component: DisciplineComponent },
  { path : '', component: DisciplineComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisciplinesRoutingModule { }
