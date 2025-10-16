import { NgModule } from '@angular/core';
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
import { SharedModule} from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './features/auth/auth.module';
import { ServiceModule } from './service/service.module';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    SharedModule,
    ReactiveFormsModule,
    AuthModule,
    ServiceModule

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
