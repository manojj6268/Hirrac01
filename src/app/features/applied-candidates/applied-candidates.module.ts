import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppliedCandidateListComponent } from './applied-candidate-list/applied-candidate-list.component';
import { AppliedCandidatesRoutingModule } from './applied-candidates-routing.module';

@NgModule({
  declarations: [
    AppliedCandidateListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppliedCandidatesRoutingModule
  ]
})
export class AppliedCandidatesModule { }
