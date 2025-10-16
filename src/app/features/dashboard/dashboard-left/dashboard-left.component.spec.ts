import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLeftComponent } from './dashboard-left.component';

describe('DashboardLeftComponent', () => {
  let component: DashboardLeftComponent;
  let fixture: ComponentFixture<DashboardLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardLeftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
