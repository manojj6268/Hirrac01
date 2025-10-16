import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardstartupComponent } from './dashboardstartup/dashboardstartup.component';
import { DashboardLeftComponent } from './dashboard-left/dashboard-left.component';
import { DashboardTopLeftComponent } from './dashboard-top-left/dashboard-top-left.component';
import { DashboardMiddleLeftComponent } from './dashboard-middle-left/dashboard-middle-left.component';
import { DashboardBotomLeftComponent } from './dashboard-botom-left/dashboard-botom-left.component';
import { DashboardRightComponent } from './dashboard-right/dashboard-right.component';
import { DashboardTopRightComponent } from './dashboard-top-right/dashboard-top-right.component';
import { DashboardBottomRightComponent } from './dashboard-bottom-right/dashboard-bottom-right.component';
import { DashboardProfileComponent } from './dashboard-profile/dashboard-profile.component';



@NgModule({
  declarations: [
    DashboardstartupComponent,
    DashboardLeftComponent,
    DashboardTopLeftComponent,
    DashboardMiddleLeftComponent,
    DashboardBotomLeftComponent,
    DashboardRightComponent,
    DashboardTopRightComponent,
    DashboardBottomRightComponent,
    DashboardProfileComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardstartupComponent,
    DashboardTopLeftComponent,
    DashboardMiddleLeftComponent,
    DashboardBotomLeftComponent,
    DashboardRightComponent,
    DashboardLeftComponent
  ]
})
export class DashboardModule { }
