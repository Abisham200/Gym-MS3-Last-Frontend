import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEntrollmentComponent } from './user-entrollment.component';

describe('UserEntrollmentComponent', () => {
  let component: UserEntrollmentComponent;
  let fixture: ComponentFixture<UserEntrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserEntrollmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEntrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
