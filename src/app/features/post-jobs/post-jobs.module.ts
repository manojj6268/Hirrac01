import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CreateJobComponent } from './create-job/create-job.component';
// Routing module not found; remove import or create './post-jobs-routing.module.ts'

@NgModule({
  declarations: [
    CreateJobComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule
  ]
})
export class PostJobsModule { }
