import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingTopComponent } from './billing-top/billing-top.component';
import { BillingSubscriptionComponent } from './billing-subscription/billing-subscription.component';
import { BillingDashboardComponent } from './billing-dashboard/billing-dashboard.component';



@NgModule({
  declarations: [
    BillingTopComponent,
    BillingSubscriptionComponent,
    BillingDashboardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BillingTopComponent,
    BillingSubscriptionComponent,
    BillingDashboardComponent
  ]
})
export class BillingModule { }
