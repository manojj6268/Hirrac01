import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { CandidateSearchComponent } from './candidate-search/candidate-search.component';

const routes: Routes = [
  // Landing page when "Search Candidate" is clicked from sidebar
  { path: '', component: CandidateDetailsComponent },

  // Page that shows the actual search result UI (Figma layout)
  { path: 'search', component: CandidateSearchComponent },

  // Optional advanced search filters section
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchCandidateRoutingModule {}
