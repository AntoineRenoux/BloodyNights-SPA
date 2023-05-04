import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateChroniclesComponent } from './create-chronicles/create-chronicles.component';
import { ChroniclesListComponent } from './chronicles-list/chronicles-list.component';

const routes: Routes = [
  { path: 'create', component: CreateChroniclesComponent },
  { path: '', component: ChroniclesListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChronicleRoutingModule { }
