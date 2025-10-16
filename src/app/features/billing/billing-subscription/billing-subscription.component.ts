import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface SubscriptionPlan {
  name: string;
  icon: string;
  type: string;
  price: string;
  includes: string;
  features: string[];
  monthlyPrice?: number;
  yearlyPrice?: number;
  isPopular?: boolean;
}

interface SubscriptionData {
  plans: SubscriptionPlan[];
}

@Component({
  selector: 'app-billing-subscription',
  templateUrl: './billing-subscription.component.html',
  styleUrls: ['./billing-subscription.component.scss']
})
export class BillingSubscriptionComponent implements OnInit {
  @Input() selectedPlan: string = 'yearly'; // 'monthly' or 'yearly'
  @Output() planSelected = new EventEmitter<string>();
  @Output() subscriptionPurchased = new EventEmitter<{plan: string, billing: string}>();

  subscriptionData: SubscriptionData | null = null;
  loading: boolean = true;
  selectedSubscription: string | null = null;
  showFeatures: { [key: string]: boolean } = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadSubscriptionData();
  }

  loadSubscriptionData(): void {
    this.http.get<SubscriptionData>('assets/data/subscription.json').subscribe({
      next: (data) => {
        this.subscriptionData = data;
        this.processSubscriptionData();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading subscription data:', error);
        this.loading = false;
      }
    });
  }

  processSubscriptionData(): void {
    if (this.subscriptionData) {
      this.subscriptionData.plans.forEach(plan => {
        // Extract numeric price and calculate yearly price
        const priceMatch = plan.price.match(/₹([\d,]+)/);
        if (priceMatch) {
          const monthlyPrice = parseInt(priceMatch[1].replace(/,/g, ''));
          plan.monthlyPrice = monthlyPrice;
          plan.yearlyPrice = Math.round(monthlyPrice * 12 * 0.9); // 10% discount for yearly
        }
        
        // Set popular plan
        plan.isPopular = plan.name === 'Professional';
      });
    }
  }

  getDisplayPrice(plan: SubscriptionPlan): string {
    if (this.selectedPlan === 'yearly' && plan.yearlyPrice) {
      return `₹${plan.yearlyPrice.toLocaleString()}`;
    }
    // Extract just the numeric price from the original price string
    const priceMatch = plan.price.match(/₹([\d,]+)/);
    if (priceMatch) {
      return `₹${priceMatch[1]}`;
    }
    return plan.price;
  }

  getSavings(plan: SubscriptionPlan): number {
    if (this.selectedPlan === 'yearly' && plan.monthlyPrice && plan.yearlyPrice) {
      const monthlyTotal = plan.monthlyPrice * 12;
      return monthlyTotal - plan.yearlyPrice;
    }
    return 0;
  }

  onBuyNow(planName: string): void {
    this.selectedSubscription = planName;
    const plan = this.subscriptionData?.plans.find(p => p.name.toLowerCase() === planName.toLowerCase());
    
    if (plan) {
      const purchaseData = {
        plan: planName,
        billing: this.selectedPlan,
        price: this.getDisplayPrice(plan),
        savings: this.getSavings(plan)
      };
      
      console.log('Purchase initiated:', purchaseData);
      this.subscriptionPurchased.emit({plan: planName, billing: this.selectedPlan});
      
      // Simulate purchase process
      this.simulatePurchase(planName);
    }
  }

  simulatePurchase(planName: string): void {
    // Simulate API call for purchase
    setTimeout(() => {
      console.log(`Purchase completed for ${planName} plan`);
      this.selectedSubscription = null;
      // Here you would typically redirect to payment gateway or show success message
    }, 2000);
  }

  toggleFeatures(planName: string): void {
    this.showFeatures[planName] = !this.showFeatures[planName];
  }

  isFeatureExpanded(planName: string): boolean {
    return this.showFeatures[planName] || false;
  }

  onPlanSelect(plan: string): void {
    this.selectedPlan = plan;
    this.planSelected.emit(plan);
  }

  getPlanIcon(planName: string): string {
    const plan = this.subscriptionData?.plans.find(p => p.name === planName);
    return plan?.icon || '';
  }

  getPlanType(planName: string): string {
    const plan = this.subscriptionData?.plans.find(p => p.name === planName);
    return plan?.type || '';
  }

  getPlanFeatures(planName: string): string[] {
    const plan = this.subscriptionData?.plans.find(p => p.name === planName);
    return plan?.features || [];
  }

  getPlanIncludes(planName: string): string {
    const plan = this.subscriptionData?.plans.find(p => p.name === planName);
    return plan?.includes || '';
  }

  isPlanPopular(planName: string): boolean {
    const plan = this.subscriptionData?.plans.find(p => p.name === planName);
    return plan?.isPopular || false;
  }
}