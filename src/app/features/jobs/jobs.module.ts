import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobPreviewComponent } from './job-preview/job-preview.component';

@NgModule({
  declarations: [
    JobsListComponent,
    JobDetailsComponent,
    JobPreviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    JobsRoutingModule
  ],
  exports: [
    JobsListComponent,
    JobDetailsComponent,
    JobPreviewComponent
  ]
})
export class JobsModule { }
