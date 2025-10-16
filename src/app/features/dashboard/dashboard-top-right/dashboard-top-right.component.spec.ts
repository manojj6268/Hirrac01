import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTopRightComponent } from './dashboard-top-right.component';

describe('DashboardTopRightComponent', () => {
  let component: DashboardTopRightComponent;
  let fixture: ComponentFixture<DashboardTopRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardTopRightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardTopRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
