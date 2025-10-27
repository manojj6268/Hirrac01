import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchCandidateRoutingModule } from './search-candidate-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SearchCandidateRoutingModule
  ]
})
export class SearchCandidateModule { }
