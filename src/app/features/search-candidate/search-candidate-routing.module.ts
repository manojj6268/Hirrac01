import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdvancedSearchFiltersComponent } from './advanced-search-filters/advanced-search-filters.component';


const routes: Routes = [
  { path: 'advanced-filters', component: AdvancedSearchFiltersComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchCandidateRoutingModule { }
