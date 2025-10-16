import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-billing-top',
  templateUrl: './billing-top.component.html',
  styleUrls: ['./billing-top.component.scss']
})
export class BillingTopComponent {
  @Input() selectedPlan: string = 'yearly';
  @Output() planSelected = new EventEmitter<string>();

  selectPlan(plan: string): void {
    this.selectedPlan = plan;
    this.planSelected.emit(plan);
  }
}