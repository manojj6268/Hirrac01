import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedCandidateListComponent } from './applied-candidate-list.component';

describe('AppliedCandidateListComponent', () => {
  let component: AppliedCandidateListComponent;
  let fixture: ComponentFixture<AppliedCandidateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppliedCandidateListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppliedCandidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
