import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAssignmentComponent } from './pending-assignment.component';

describe('PendingAssignmentComponent', () => {
  let component: PendingAssignmentComponent;
  let fixture: ComponentFixture<PendingAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
