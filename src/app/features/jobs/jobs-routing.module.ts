import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobPreviewComponent } from './job-preview/job-preview.component';

const routes: Routes = [
  { path: '', component: JobsListComponent },
  { path: 'list', component: JobsListComponent },
  { path: 'details/:id', component: JobDetailsComponent },
  { path: 'preview/:id', component: JobPreviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
