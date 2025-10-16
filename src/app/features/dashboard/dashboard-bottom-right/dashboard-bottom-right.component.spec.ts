import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBottomRightComponent } from './dashboard-bottom-right.component';

describe('DashboardBottomRightComponent', () => {
  let component: DashboardBottomRightComponent;
  let fixture: ComponentFixture<DashboardBottomRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardBottomRightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardBottomRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
