import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBotomLeftComponent } from './dashboard-botom-left.component';

describe('DashboardBotomLeftComponent', () => {
  let component: DashboardBotomLeftComponent;
  let fixture: ComponentFixture<DashboardBotomLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardBotomLeftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardBotomLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
