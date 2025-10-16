import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingTopComponent } from './billing-top.component';

describe('BillingTopComponent', () => {
  let component: BillingTopComponent;
  let fixture: ComponentFixture<BillingTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingTopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillingTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
