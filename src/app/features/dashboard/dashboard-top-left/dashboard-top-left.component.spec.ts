import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTopLeftComponent } from './dashboard-top-left.component';

describe('DashboardTopLeftComponent', () => {
  let component: DashboardTopLeftComponent;
  let fixture: ComponentFixture<DashboardTopLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardTopLeftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardTopLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
