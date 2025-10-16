import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InterviewsComponent } from './interviews.component';

@NgModule({
  declarations: [
    InterviewsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    InterviewsComponent
  ]
})
export class InterviewsModule { }
