import { Component } from '@angular/core';

@Component({
  selector: 'app-billing-dashboard',
  templateUrl: './billing-dashboard.component.html',
  styleUrl: './billing-dashboard.component.scss'
})
export class BillingDashboardComponent {
  selectedPlan: string = 'yearly';

  onPlanSelected(plan: string): void {
    this.selectedPlan = plan;
    console.log('Billing plan selected:', plan);
  }

  onSubscriptionPurchased(purchaseData: {plan: string, billing: string}): void {
    console.log('Subscription purchase initiated:', purchaseData);
    
    // Here you would typically:
    // 1. Redirect to payment gateway
    // 2. Show payment form
    // 3. Handle payment processing
    // 4. Show success/error messages
    
    // For now, we'll just log the purchase data
    alert(`Purchase initiated for ${purchaseData.plan} plan with ${purchaseData.billing} billing`);
  }
}
