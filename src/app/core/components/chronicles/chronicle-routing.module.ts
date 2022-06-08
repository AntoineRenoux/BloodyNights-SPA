import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateChroniclesComponent } from './create-chronicles/create-chronicles.component';

const routes: Routes = [
  { path: 'create', component: CreateChroniclesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChronicleRoutingModule { }
