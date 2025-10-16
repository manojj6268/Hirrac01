import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateSearchComponent } from './candidate-search/candidate-search.component';
import { AdvancedSearchFiltersComponent } from './advanced-search-filters/advanced-search-filters.component';
import { CandidateResultsComponent } from './candidate-result/candidate-result.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';

const routes: Routes = [
  { path: '', component: CandidateSearchComponent },
  { path: 'advanced-filters', component: AdvancedSearchFiltersComponent },
  { path: 'result', component: CandidateResultsComponent },
  { path: 'details', component: CandidateDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchCandidateRoutingModule { }
