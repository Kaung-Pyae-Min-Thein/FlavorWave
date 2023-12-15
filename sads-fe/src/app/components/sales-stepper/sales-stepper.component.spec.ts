import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesStepperComponent } from './sales-stepper.component';

describe('SalesStepperComponent', () => {
  let component: SalesStepperComponent;
  let fixture: ComponentFixture<SalesStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesStepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
