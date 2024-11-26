import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrollmentAddComponent } from './entrollment-add.component';

describe('EntrollmentAddComponent', () => {
  let component: EntrollmentAddComponent;
  let fixture: ComponentFixture<EntrollmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntrollmentAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrollmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
