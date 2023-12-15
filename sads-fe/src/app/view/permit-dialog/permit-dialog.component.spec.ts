import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitDialogComponent } from './permit-dialog.component';

describe('PermitDialogComponent', () => {
  let component: PermitDialogComponent;
  let fixture: ComponentFixture<PermitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
