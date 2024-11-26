import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrollmentListComponent } from './entrollment-list.component';

describe('EntrollmentListComponent', () => {
  let component: EntrollmentListComponent;
  let fixture: ComponentFixture<EntrollmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntrollmentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrollmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
