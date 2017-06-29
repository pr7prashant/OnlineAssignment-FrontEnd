import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousAssignmentsComponent } from './previous-assignments.component';

describe('PreviousAssignmentsComponent', () => {
  let component: PreviousAssignmentsComponent;
  let fixture: ComponentFixture<PreviousAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
