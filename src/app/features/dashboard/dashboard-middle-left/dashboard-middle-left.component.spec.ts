import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMiddleLeftComponent } from './dashboard-middle-left.component';

describe('DashboardMiddleLeftComponent', () => {
  let component: DashboardMiddleLeftComponent;
  let fixture: ComponentFixture<DashboardMiddleLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardMiddleLeftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardMiddleLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
