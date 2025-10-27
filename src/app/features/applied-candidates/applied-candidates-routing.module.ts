import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppliedCandidateListComponent } from './applied-candidate-list/applied-candidate-list.component';

const routes: Routes = [
  { path: '', component: AppliedCandidateListComponent },
  // Add more routes here if needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppliedCandidatesRoutingModule { }
