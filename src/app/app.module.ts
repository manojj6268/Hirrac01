import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { JobsModule } from './features/jobs/jobs.module';
import { InterviewsModule } from './features/interviews/interviews.module';
import { MessagesModule } from './features/messages/messages.module';
import { BillingModule } from './features/billing/billing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './features/auth/auth.module';
import { ServiceModule } from './service/service.module';
import { SearchCandidateModule } from './features/search-candidate/search-candidate.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppliedCandidatesModule } from './features/applied-candidates/applied-candidates.module';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    SearchCandidateModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    DashboardModule,
    JobsModule,
    InterviewsModule,
    MessagesModule,
    BillingModule,
    CommonModule,
    ReactiveFormsModule,
    AuthModule,
    ServiceModule,
    AppliedCandidatesModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [
    provideClientHydration()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
