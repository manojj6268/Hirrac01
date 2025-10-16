import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { CandidateResultsComponent } from './candidate-result/candidate-result.component';
import { CandidateSearchComponent } from './candidate-search/candidate-search.component';
import { AdvancedSearchFiltersComponent } from './advanced-search-filters/advanced-search-filters.component';
import { SearchCandidateRoutingModule } from './search-candidate-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CandidateSearchComponent,
    AdvancedSearchFiltersComponent,
    CandidateDetailsComponent,
    CandidateResultsComponent,
    SearchCandidateRoutingModule
  ]
})
export class SearchCandidateModule { }
