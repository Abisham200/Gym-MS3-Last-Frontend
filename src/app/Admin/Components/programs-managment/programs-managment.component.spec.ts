import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsManagementComponent } from './programs-managment.component';

describe('ProgramsManagmentComponent', () => {
  let component: ProgramsManagementComponent;
  let fixture: ComponentFixture<ProgramsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
