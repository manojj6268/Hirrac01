import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardstartupComponent } from './features/dashboard/dashboardstartup/dashboardstartup.component';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { CandidatesComponent } from './features/candidates/candidates.component';
import { TeamComponent } from './features/team/team.component';
import { CalendarComponent } from './features/calendar/calendar.component';
import { InterviewsComponent } from './features/interviews/interviews.component';
import { BillingDashboardComponent } from './features/billing/billing-dashboard/billing-dashboard.component';
import { ProfileSettingsComponent } from './shared/profile-setting/profile-setting.component';
import { DashboardProfileComponent } from './features/dashboard/dashboard-profile/dashboard-profile.component';
import { NotificationSettingComponent } from './shared/notification-setting/notification-setting.component';
import { CreateJobComponent } from './features/post-jobs/create-job/create-job.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardstartupComponent },
  { path: 'dashboard-profile', component: DashboardProfileComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'candidates', component: CandidatesComponent },
  { path: 'team', component: TeamComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'interviews', component: InterviewsComponent },
  { path: 'billing', component: BillingDashboardComponent },
  { path: 'profile-setting', component: ProfileSettingsComponent },
  { path: 'notification-setting', component: NotificationSettingComponent },
  {path:'post-jobs',component: CreateJobComponent},

  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },

  {path: 'jobs',
    loadChildren: () =>
      import('./features/jobs/jobs.module').then((m) => m.JobsModule),
  },
  { path: 'post-jobs',
    loadChildren: () =>
      import('./features/post-jobs/post-jobs.module').then(m => m.PostJobsModule),
  },
  // wildcard fallback

  { path: 'messages',
    loadChildren: () =>
      import('./features/messages/messages.module').then(m => m.MessagesModule),
  },
  { path: 'search-candidate',
    loadChildren: () =>
      import('./features/search-candidate/search-candidate.module').then(m => m.SearchCandidateModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
